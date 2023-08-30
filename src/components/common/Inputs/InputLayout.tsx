import { ReactNode } from "react";
import { DeepMap, FieldError, FieldValues } from "react-hook-form";

import classNames from "classnames/bind";

import styles from "./InputLayout.module.scss";

const cx = classNames.bind(styles);

interface InputLayoutProps {
  label?: string;
  hasEditMode: boolean;
  focused?: boolean;
  editBtnId: string;
  inputId: string;
  name: string;
  errors: DeepMap<FieldValues, FieldError>;
  bottomText?: string;
  children: ReactNode;
  isError?:boolean;
}
/**
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param labe {string} 라벨
 * @param hasEditMode {boolean} 수정모드 여부
 * @param focused {boolean} input의 focus여부
 * @param editBtnId {string} 수정버튼 element에 부여할 id
 * @param inputId {string} input element에 부여할 id
 * @param errors {object} input 에러 객체
 * @param bottomText {string} input란 하단의 텍스트
 * @example
 * ```tsx
 *   <InputLayout
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
 * ```
 `
 */
const InputLayout = ({
  label, hasEditMode, focused, editBtnId, inputId, name, errors, bottomText, children, isError,
}: InputLayoutProps) => {
  const error = !!errors[name] || isError;
  return (
    <div className={cx("container")}>
      {label && (
        <div className={cx("labelArea")}>
          <label htmlFor={inputId}>{label}</label>
          {hasEditMode && focused && <button id={editBtnId} className={cx("editBtn")} data-testid="edit-button">저장</button>}
        </div>
      )}
      {children}
      <span className={cx("bottomText", { error })}>
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          errors[name]?.message ?? bottomText
        }
      </span>
    </div>
  );
};

export default InputLayout;
