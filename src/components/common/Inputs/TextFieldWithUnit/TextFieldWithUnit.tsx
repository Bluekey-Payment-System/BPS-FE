import {
  ForwardedRef, forwardRef,
} from "react";

import classNames from "classnames/bind";

import useInputWithEditMode from "@/hooks/useInputWithEditMode";

import InputLayout from "../InputLayout";
import { TextFieldProps } from "../TextField/TextField";
import styles from "../TextField.module.scss";

const cx = classNames.bind(styles);

interface TextFieldWithUnitProps extends TextFieldProps {
  unit: string;
}

const TextFieldWithUnit = forwardRef((
  {
    label, errors, onSave, resetField, bottomText, value, unit, ...props
  }: TextFieldWithUnitProps,
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
          className={cx("input", { error }, "unit")}
          ref={ref}
          onFocus={focusInput}
          onChange={onSave ? handleChangeWithEditMode : props.onChange}
          onBlur={onSave ? handleBlurWithEditMode : props.onBlur}
          type={props.type ?? "text"}
        />
        <span className={cx("unitText")}>{unit}</span>
      </div>
    </InputLayout>
  );
});

export default TextFieldWithUnit;
