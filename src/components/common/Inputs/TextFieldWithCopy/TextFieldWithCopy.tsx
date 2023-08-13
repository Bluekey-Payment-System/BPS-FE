import {
  ForwardedRef, MouseEventHandler, forwardRef,
} from "react";

import classNames from "classnames/bind";

import useForwardRef from "@/hooks/useForwardRef";
import useInputWithEditMode from "@/hooks/useInputWithEditMode";
import useToast from "@/hooks/useToast";

import InputLayout from "../InputLayout";
import { TextFieldProps } from "../TextField/TextField";
import styles from "../TextField.module.scss";

const cx = classNames.bind(styles);

const TextFieldWithCopy = forwardRef((
  {
    label, errors, onSave, resetField, bottomText, value, ...props
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const error = !!errors[props.name!];
  const {
    focused,
    focusInput,
    inputId,
    editBtnId,
    handleChangeWithEditMode,
    handleBlurWithEditMode,
  } = useInputWithEditMode({
    value,
    onChange: props.onChange,
    onSave,
    resetField,
    name: props.name as string,
    isError: error,
  });
  const { showToast } = useToast();
  const inputRef = useForwardRef<HTMLInputElement>(ref);

  const handleClickCopyToClipboard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const asyncWrapper = async () => {
      await navigator.clipboard.writeText(inputRef.current.value);
    };
    asyncWrapper()
      .then(() => { showToast("클립보드에 복사했습니다."); })
      .catch(() => { return showToast("클립보드 복사에 실패했습니다."); });
  };

  return (
    <InputLayout
      label={label}
      hasEditMode={!!onSave}
      focused={focused}
      editBtnId={editBtnId}
      inputId={inputId}
      name={props.name as string}
      errors={errors}
      bottomText={bottomText}
    >
      <div className={cx("container")}>
        <input
          {...props}
          id={inputId}
          className={cx("input", { error }, "copy")}
          ref={inputRef}
          onFocus={focusInput}
          onChange={onSave ? handleChangeWithEditMode : props.onChange}
          onBlur={onSave ? handleBlurWithEditMode : props.onBlur}
          type={props.type ?? "text"}
        />
        <button
          className={cx("copyBtn")}
         // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleClickCopyToClipboard}
        >
          <span className={cx("copyText")}>복사</span>
        </button>
      </div>
    </InputLayout>
  );
});

export default TextFieldWithCopy;
