import classNames from "classnames/bind";

import Popover from "@/components/common/Popover/Popover";
import { useRequestAuthoritiesList } from "@/services/queries/notification-controller/useRequestAuthorities";

import styles from "./Notification.module.scss";
import RequestAuthorityList from "./RequestAuthoriyList";

const cx = classNames.bind(styles);

// TODO) 권한 요청 목록 데이터 GET & 필터링된 데이터를 prop으로 넘겨주기

const Notification = ({ onClickNotification }: { onClickNotification: () => void }) => {
  const { data: authoritiyList } = useRequestAuthoritiesList();
  return (
    <Popover
      centerX
      zIndex={3}
      onClose={() => { onClickNotification(); }}
    >
      <div className={cx("container")}>
        {authoritiyList && <RequestAuthorityList data={authoritiyList.contents} />}
      </div>
    </Popover>
  );
};

export default Notification;
