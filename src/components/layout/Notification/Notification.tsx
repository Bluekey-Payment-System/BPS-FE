import classNames from "classnames/bind";

import Popover from "@/components/common/Popover/Popover";
import { FILTERED_REQUESET_AUTHORITIES } from "@/services/api/requests/notification-controller/notification-controller.mock";

import styles from "./Notification.module.scss";
import RequestAuthorityList from "./RequestAuthoriyList";

const cx = classNames.bind(styles);

const Notification = ({ onClickNotification }: { onClickNotification: () => void }) => {
  return (
    <Popover
      centerX
      zIndex={3}
      onClose={() => { onClickNotification(); }}
    >
      <div className={cx("container")}>
        <RequestAuthorityList data={FILTERED_REQUESET_AUTHORITIES} />
      </div>
    </Popover>
  );
};

export default Notification;
