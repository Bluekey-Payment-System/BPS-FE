import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

import classNames from "classnames/bind";

import styles from "./Checkbox.module.scss";

const cx = classNames.bind(styles);

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

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
