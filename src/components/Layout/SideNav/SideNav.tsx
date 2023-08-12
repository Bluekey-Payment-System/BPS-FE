import classNames from "classnames/bind";

import styles from "./SideNav.module.scss";
import { SUPER_ADMIN } from "./SideNav.utils";

const cx = classNames.bind(styles);

const SideNav = () => {
  return (
    <aside className={cx("asideContainer")}>
      {SUPER_ADMIN.map((list) => {
        return <div className={cx("asideItem")} key={list}>{list}</div>;
      })}

    </aside>
  );
};

export default SideNav;
