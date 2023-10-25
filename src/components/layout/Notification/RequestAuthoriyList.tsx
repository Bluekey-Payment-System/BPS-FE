import classNames from "classnames/bind";

import { IRequestAuthority } from "@/types/dto";

import styles from "./RequestAuthorityList.module.scss";
import StatusChip from "./StatusChip";

const cx = classNames.bind(styles);

const RequestAuthorityList = ({ data }: { data: IRequestAuthority[] }) => {
  if (data.length === 0) {
    return (
      <div className={cx("noContent")}>알림이 없습니다.</div>
    );
  }
  return (
    <div className={cx("container")}>
      {data.map((item) => {
        return (
          <div className={cx("content")} key={item.requestAuthorityId}>
            <div className={cx("sender")}>
              <span className={cx("senderNickname")}>{item.sender.nickname}</span>
              {" "}
              님이 어드민 권한을 요청합니다
            </div>
            <div className={cx("status")}>
              <StatusChip status={item.status} requestAuthorityId={item.requestAuthorityId} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestAuthorityList;
