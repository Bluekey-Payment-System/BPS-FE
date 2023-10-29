import classNames from "classnames/bind";

import Popover from "@/components/common/Popover/Popover";
import { useRequestAuthoritiesList } from "@/services/queries/notification-controller/useRequestAuthorities";

import styles from "./Notification.module.scss";
import RequestAuthorityList from "./RequestAuthoriyList";

const cx = classNames.bind(styles);

const Notification = ({ onClickNotification }: { onClickNotification: () => void }) => {
  const { data: authorityList } = useRequestAuthoritiesList();
  return (
    <Popover
      centerX
      zIndex={3}
      onClose={() => { onClickNotification(); }}
    >
      <div className={cx("container")}>
        {authorityList && <RequestAuthorityList data={authorityList.contents} />}
      </div>
    </Popover>
  );
};

export default Notification;
