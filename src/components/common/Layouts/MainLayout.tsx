import classNames from "classnames/bind";

import styles from "./MainLayout.module.scss";

const cx = classNames.bind(styles);

interface MainLayoutProps {
  title: string
  children: React.ReactNode
}

/**
 * #### 페이지 전체를 감싸는 제목과 내용으로만 이루어진 레이아웃
 * ##### 사용처: 아티스트 등록, 앨범 등록, 앨범 탐색, 아티스트 계정 관리, 내 프로필
 *
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 * @param {string} title - 레이아웃의 제목입니다.
 * @param {React.ReactNode} children - 레이아웃의 내용 컴포넌트입니다.
 *
 */
const MainLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <section className={cx("container")}>
      <h1 className={cx("title")}>{title}</h1>
      {children}
    </section>
  );
};

export default MainLayout;
