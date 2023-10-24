import classNames from "classnames/bind";

import styles from "./Notification.module.scss";

const cx = classNames.bind(styles);

const Notification = () => {
  return (
    <div className={cx("container")}>
      팝업창 입니다.
    </div>
  );
};

export default Notification;
