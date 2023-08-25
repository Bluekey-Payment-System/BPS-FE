import {
  ForwardedRef, MouseEventHandler, forwardRef, useId,
} from "react";

import classNames from "classnames/bind";

import useForwardRef from "@/hooks/useForwardRef";
import useToast from "@/hooks/useToast";

import InputLayout from "../InputLayout";
import { TextFieldProps } from "../TextField/TextField";
import styles from "../TextField.module.scss";

const cx = classNames.bind(styles);

const TextFieldWithCopy = forwardRef((
  {
    label, errors, bottomText, ...props
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const error = !!errors[props.name!];
  const { showToast } = useToast();
  const inputRef = useForwardRef<HTMLInputElement>(ref);
  const id = useId();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleClickCopyToClipboard: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(inputRef.current.value);
      showToast("클립보드에 복사했습니다.");
    } catch (err) {
      console.error(err);
    }
  };

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
          className={cx("input", { error }, "copy")}
          ref={inputRef}
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
