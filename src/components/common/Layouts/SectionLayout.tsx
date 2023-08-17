import classNames from "classnames/bind";

import styles from "./SectionLayout.module.scss";

const cx = classNames.bind(styles);

interface SectionLayoutProps {
  title: string
  children: React.ReactNode
}

/**
 * #### 섹션(페이지 절반 정도)을 감싸는 제목과 내용으로 이루어진 레이아웃
 *
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 * @param {string} title - 레이아웃의 제목입니다.
 * @param {React.ReactNode} children - 레이아웃의 내용 컴포넌트입니다.
 *
 */
const SectionLayout = ({ title, children }: SectionLayoutProps) => {
  return (
    <section className={cx("container")}>
      <h2 className={cx("title")}>{title}</h2>
      {children}
    </section>
  );
};

export default SectionLayout;
