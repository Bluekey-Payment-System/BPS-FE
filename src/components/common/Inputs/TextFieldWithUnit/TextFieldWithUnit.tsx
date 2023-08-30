import {
  ForwardedRef, forwardRef, useId,
} from "react";

import classNames from "classnames/bind";

import InputLayout from "../InputLayout";
import { TextFieldProps } from "../TextField/TextField";
import styles from "../TextField.module.scss";

const cx = classNames.bind(styles);

interface TextFieldWithUnitProps extends TextFieldProps {
  unit: string;
  isError?: boolean;
}

const TextFieldWithUnit = forwardRef((
  {
    label, errors, bottomText, unit, isError, ...props
  }: TextFieldWithUnitProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const error = !!errors[props.name!] || isError;
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
      isError={isError}
    >
      <div className={cx("container")}>
        <input
          {...props}
          id={id}
          className={cx("input", { error }, "unit")}
          ref={ref}
          type={props.type ?? "text"}
        />
        <span className={cx("unitText")}>{unit}</span>
      </div>
    </InputLayout>
  );
});

export default TextFieldWithUnit;
