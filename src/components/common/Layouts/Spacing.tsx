import { HTMLAttributes, memo } from "react";

interface SpacingProps extends HTMLAttributes<HTMLDivElement> {
  children?: never;
  direction?: "horizontal" | "vertical";
  size: number;
}
/**
 * Spacing 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param direction {"horizontal" | "vertical"} vertical: 상하 spacing, horizontal: 좌위 spacing
 * @param size {string} 여백 사이즈
 * @param ...props {HTMLAttributes<HTMLDivElement>} div엘리먼트 네이티브 속성들
 */
const Spacing = memo(({ direction = "vertical", size, ...props }: SpacingProps) => {
  return (
    <div
      style={{
        flex: "none",
        width: direction === "horizontal" ? `${size}px` : undefined,
        height: direction === "vertical" ? `${size}px` : undefined,
      }}
      {...props}
    />
  );
});

export default Spacing;
