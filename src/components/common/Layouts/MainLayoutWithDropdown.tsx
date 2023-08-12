import classNames from "classnames/bind";

import styles from "./MainLayoutWithDropdown.module.scss";

const cx = classNames.bind(styles);

interface MainLayoutWithDropdownProps {
  title: string
  dropdownElement: React.ReactNode
  children: React.ReactNode
}

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
