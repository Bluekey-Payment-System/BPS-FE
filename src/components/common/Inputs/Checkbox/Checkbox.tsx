import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

import classNames from "classnames/bind";

import styles from "./Checkbox.module.scss";

const cx = classNames.bind(styles);

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
/**
 * 체크박스 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param { string } label - 체크박스 라벨
 * @example
 *
 * ```
 * const { register } = useForm(); // react-hook-form을 사용하는 예시
 * ...
 * <Checkbox label="영문과 동일" {...register("isSameWithKoName")} />
 * ...
 * ```
 *
 */
const Checkbox = forwardRef((
  { label, ...props }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (

    <label className={cx("container")} htmlFor={props.id}>
      <input id={props.id} type="checkbox" ref={ref} {...props} />
      <div className={cx("checkmark")} />
      {label}
    </label>
  );
});

export default Checkbox;
