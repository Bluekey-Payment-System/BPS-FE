import classNames from "classnames/bind";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: "large" | "medium" | "small";
  theme: "bright" | "dark";
  onClick?: () => void;
  onSubmit?: () => void;
  isTextEmphasis?: boolean;
  children: React.ReactNode;
}

const Button = ({
  size, theme, onClick, onSubmit, isTextEmphasis = false, children, ...props
}: ButtonProps) => {
  return (
    <button className={cx("button", { [size]: size, [theme]: theme, isTextEmphasis })} onClick={onClick} onSubmit={onSubmit} type="button" {...props}>{children}</button>
  );
};

export default Button;
