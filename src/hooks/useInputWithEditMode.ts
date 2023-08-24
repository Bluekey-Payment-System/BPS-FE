import {
  ChangeEventHandler,
  FocusEventHandler,
  useMemo,
  useState,
} from "react";
import { FieldValues, UseFormResetField } from "react-hook-form";

import generateID from "@/components/common/Inputs/Input.util";

interface IUseInputWithEditModeParam {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSave?: (value: string) => Promise<void> | void;
  resetField?: UseFormResetField<FieldValues>;
  name: string;
  isError: boolean;
}

const useInputWithEditMode = ({
  value, onChange, onSave, resetField, name, isError,
} : IUseInputWithEditModeParam) => {
  const [oldValue, setOldValue] = useState(value ?? "");
  const [newValue, setNewValue] = useState(oldValue);
  const [focused, setFocused] = useState(false);
  const inputId = useMemo(() => { return generateID("input-id-"); }, []);
  const editBtnId = useMemo(() => { return generateID("edit-btn-id-"); }, []);

  const focusInput = () => {
    setFocused(true);
  };

  const blurInput = () => {
    setFocused(false);
  };

  const handleChangeWithEditMode: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewValue(e.target.value);
    onChange?.(e);
  };

  const handleBlurWithEditMode: FocusEventHandler<HTMLInputElement> = (e) => {
    const onSaveWrapper = async () => {
      await onSave!(newValue);
    };
    // 저장 버튼을 눌러 blur가 된 경우, onSave함수 실행
    if (e.relatedTarget?.id === editBtnId && !isError && newValue !== oldValue) {
      onSaveWrapper()
        .then(() => { setOldValue(newValue); })
        .catch((err) => { console.error(err); });
    } else {
      setNewValue(oldValue);
      resetField?.(name, { defaultValue: oldValue });
    }
    blurInput();
  };

  return {
    focused,
    focusInput,
    inputId,
    editBtnId,
    handleChangeWithEditMode,
    handleBlurWithEditMode,
  };
};

export default useInputWithEditMode;
