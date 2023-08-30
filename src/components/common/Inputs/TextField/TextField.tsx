import {
  ForwardedRef, InputHTMLAttributes, forwardRef,
} from "react";
import {
  DeepMap, FieldError, FieldValues, UseFormReturn,
} from "react-hook-form";

import classNames from "classnames/bind";

import useInputWithEditMode from "@/hooks/useInputWithEditMode";

import InputLayout from "../InputLayout";
import styles from "../TextField.module.scss";

const cx = classNames.bind(styles);

export interface TextFieldProps
  extends
  InputHTMLAttributes<HTMLInputElement>,
  Partial<Pick<UseFormReturn, "resetField">> {
  label?: string;
  originalValue?: string;
  errors: DeepMap<FieldValues, FieldError>;
  isError?: boolean;
  bottomText?: string;
  onSave?: (value: string) => Promise<void> | void;
}
/**
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param label {string} 텍스트 필드 라벨
 * @param errors {object} 인풋 에러 객체
 * @param onSave {Function} 수정모드를 위한 수정버튼 누를 시 실행할 함수
 * @param resetField {Function} 필드를 리셋하는 함수
 * @param bottomText {string} input하단의 텍스트
 * @param originalValue {string} input의 value
 * @param ...props 나머지 input의 native 속성들
 */
const TextField = forwardRef((
  {
    label, errors, onSave, isError, resetField, bottomText, originalValue, ...props
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
    value: originalValue,
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
      isError={isError}
      bottomText={bottomText}
    >
      <div className={cx("container")}>
        <input
          {...props}
          id={inputId}
          className={cx("input", { error })}
          ref={ref}
          onFocus={focusInput}
          onChange={onSave ? handleChangeWithEditMode : props.onChange}
          onBlur={onSave ? handleBlurWithEditMode : props.onBlur}
          type={props.type ?? "text"}
          data-testid="textfield-input"
        />
      </div>
    </InputLayout>
  );
});

export default TextField;
