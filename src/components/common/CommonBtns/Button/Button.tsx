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

/**
 * @author 연우킴 https://github.com/drizzle96
 * @param {string} size - 버튼의 크기를 지정합니다. "small", "medium", "large" 중 하나의 값이어야 합니다.
 * @param {string} theme - 버튼의 테마를 지정합니다. "dark", "bright" 중 하나의 값이어야 합니다.
 * @param {Function} onClick - 버튼 클릭 시 실행되는 콜백 함수입니다.
 * @param {Function} onSubmit - 버튼이 폼 내부에 위치할 경우, 폼 제출 시 실행되는 콜백 함수입니다.
 * @param {boolean} isTextEmphasis - 버튼 텍스트 강조 여부를 나타냅니다. 기본값은 false로 true로 설정하면 글자가 보라색 계열이 됩니다.
 * (사용 위치: 앨범 수정-수록곡 추가 버튼)
 * @param {...any} props - 기타 버튼 요소로써 추가적으로 전달되는 속성들입니다. (예시: type, disabled)
 *
 * @example
 * <Button size="large" theme="bright" isTextEmphasis onClick={onClick}>수록곡 추가</Button>
 * <Button size="large" theme="dark" disabled onSubmit={onSubmit}>가입하기</Button>
 *
 */
const Button = ({
  size, theme, onClick, onSubmit, isTextEmphasis = false, children, ...props
}: ButtonProps) => {
  return (
    <button className={cx("button", { [size]: size, [theme]: theme, isTextEmphasis })} onClick={onClick} onSubmit={onSubmit} type="button" {...props}>{children}</button>
  );
};

export default Button;
