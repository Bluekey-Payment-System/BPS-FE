import {
  ForwardedRef, forwardRef, useId, useState,
} from "react";

import classNames from "classnames/bind";

import InputLayout from "../InputLayout";
import { TextFieldProps } from "../TextField/TextField";
import styles from "../TextField.module.scss";

import EyeToggler from "./EyeToggler";

const cx = classNames.bind(styles);

const PasswordField = forwardRef((
  {
    label, errors, bottomText, ...props
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const error = !!errors[props.name!];
  const [isShowing, setIsShowing] = useState(false);
  const id = useId();
  return (
    <InputLayout
      label={label}
      hasEditMode={false}
      focused={false}
      editBtnId={id}
      inputId={id}
      name={props.name as string}
      errors={errors}
      bottomText={bottomText}
    >
      <div className={cx("container")}>
        <input
          {...props}
          id={id}
          className={cx("input", { error }, "password")}
          ref={ref}
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
