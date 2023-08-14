import {
  ForwardedRef, forwardRef, useState,
} from "react";

import classNames from "classnames/bind";

import useInputWithEditMode from "@/hooks/useInputWithEditMode";

import InputLayout from "../InputLayout";
import { TextFieldProps } from "../TextField/TextField";
import styles from "../TextField.module.scss";

import EyeToggler from "./EyeToggler";

const cx = classNames.bind(styles);

const PasswordField = forwardRef((
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
  const [isShowing, setIsShowing] = useState(false);

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
          className={cx("input", { error }, "password")}
          ref={ref}
          onFocus={focusInput}
          onChange={onSave ? handleChangeWithEditMode : props.onChange}
          onBlur={onSave ? handleBlurWithEditMode : props.onBlur}
          type={isShowing ? "text" : "password"}
        />
        <button
          className={cx("toggleBtn")}
          onClick={(e) => {
            e.preventDefault();
            setIsShowing((prev) => { return !prev; });
          }}
        >
          <EyeToggler isActive={isShowing} />
        </button>
      </div>
    </InputLayout>
  );
});

export default PasswordField;
