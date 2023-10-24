import classNames from "classnames/bind";

import Popover from "@/components/common/Popover/Popover";

import styles from "./Notification.module.scss";

const cx = classNames.bind(styles);

const Notification = ({ onClickNotification }: { onClickNotification: () => void }) => {
  return (
    <Popover
      // left="50%"
      centerX
      zIndex={3}
      onClose={() => { onClickNotification(); }}
    >
      <div className={cx("container")}>
        팝업창 입니다.
      </div>
    </Popover>
  );
};

export default Notification;
