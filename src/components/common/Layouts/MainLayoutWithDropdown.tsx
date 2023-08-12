import classNames from "classnames/bind";

import styles from "./MainLayoutWithDropdown.module.scss";

const cx = classNames.bind(styles);

interface MainLayoutWithDropdownProps {
  title: string
  dropdownElement: React.ReactNode
  children: React.ReactNode
}

/**
 * #### 페이지 전체를 감싸는 제목과 내용, 그리고 제목 옆 드롭다운 요소가 포함된 레이아웃
 * ##### 사용처: 대시보드, 정산내역 업로드
 *
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 * @param {React.ReactNode} dropdownElement - 제목 옆 드롭다운이 포함된 컴포넌트입니다.
 * @param {React.ReactNode} children - 레이아웃의 내용 컴포넌트입니다.
 *
 */
const MainLayoutWithDropdown = ({
  title,
  dropdownElement,
  children,
}: MainLayoutWithDropdownProps) => {
  return (
    <section className={cx("container")}>
      <div className={cx("titleContainer")}>
        <h1 className={cx("title")}>{title}</h1>
        {dropdownElement}
      </div>
      {children}
    </section>
  );
};

export default MainLayoutWithDropdown;
