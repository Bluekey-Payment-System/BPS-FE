import classNames from "classnames/bind";

import styles from "./ArtboardLayout.module.scss";

const cx = classNames.bind(styles);

/**
 * #### 섹션을 감싸는 흰 바탕의 아트보드 레이아웃입니다. 아트보드의 위, 아래 패딩이 적용되어 있습니다.
 *
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 * @param {React.ReactNode} children - 레이아웃의 내용 컴포넌트입니다.
 *
 */
const ArtboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cx("board")}>
      {children}
    </div>
  );
};

export default ArtboardLayout;
