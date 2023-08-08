import classNames from "classnames/bind";

import styles from "./ChipButton.module.scss";

const cx = classNames.bind(styles);

interface ChipButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "large";
  onClick?: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
}

/**
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 * @param {string} size - 버튼의 크기를 지정합니다. "small", "large" 중 하나의 값이어야 합니다. 기본값은 small입니다.
 * @param {Function} onClick - 버튼 클릭 시 실행되는 콜백 함수입니다.
 * @param {Function} onSubmit - 버튼이 폼 내부에 위치할 경우, 폼 제출 시 실행되는 콜백 함수입니다.
 * @param {...any} props - 기타 버튼 요소로써 추가적으로 전달되는 속성들입니다. (예시: type, disabled)
 *
 * @example
 * ```
 * <ChipButton onClick={onClick}>비밀번호 재발급</ChipButton>
 * <ChipButton onSubmit={onSubmit} type="submit">수정 완료</ChipButton>
 * <ChipButton size="large" onClick={onClick}>아티스트 추가</ChipButton>
 * ```
 */
const ChipButton = ({
  size = "small", onClick, onSubmit, children, ...props
}: ChipButtonProps) => {
  return (
    <button className={cx("button", { [size]: size })} onClick={onClick} onSubmit={onSubmit} type="button" {...props}>{children}</button>
  );
};

export default ChipButton;
