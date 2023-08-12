import {
  ChangeEvent,
  ForwardedRef, forwardRef, useMemo, useState,
} from "react";

import classNames from "classnames/bind";

import getStringBytes from "@/utils/getStringBytes";

import generateID from "../Input.util";
import InputLayout from "../InputLayout";
import { TextFieldProps } from "../TextField/TextField";
import styles from "../TextField.module.scss";

const cx = classNames.bind(styles);

interface TextFieldWithMaxBytesProps extends TextFieldProps {
  maxBytes: number;
}

const TextFieldWithMaxBytes = forwardRef((
  {
    label, errors, onSave, resetField, bottomText, value, maxBytes, ...props
  }: TextFieldWithMaxBytesProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const error = !!errors[props.name!];
  const [currentBytes, setCurrentBytes] = useState(0);
  const [currentValue, setCurrentValue] = useState(value ?? "");
  const inputId = useMemo(() => { return generateID("input-id-"); }, []);
  const editBtnId = useMemo(() => { return generateID("edit-btn-id-"); }, []);
  const handleChangeWithMaxBytes = (e: ChangeEvent<HTMLInputElement>) => {
    if (getStringBytes(e.target.value) <= maxBytes) {
      setCurrentBytes(getStringBytes(e.target.value));
      setCurrentValue(e.target.value);
    }
  };
  return (
    <InputLayout
      label={label}
      hasEditMode={!!onSave}
      focused={false}
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
          className={cx("input", { error }, "maxByte")}
          ref={ref}
          onChange={handleChangeWithMaxBytes}
          value={currentValue}
          type={props.type ?? "text"}
        />
        <div className={cx("byteCount")}>
          <span className={cx("currentBytes")}>{currentBytes}</span>
          <span className={cx("maxBytes")}>{`/${maxBytes}`}</span>
        </div>
      </div>
    </InputLayout>
  );
});

export default TextFieldWithMaxBytes;
