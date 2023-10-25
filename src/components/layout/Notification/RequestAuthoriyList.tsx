import classNames from "classnames/bind";

import { IRequestAuthority } from "@/types/dto";

import styles from "./RequestAuthorityList.module.scss";
import StatusChip from "./StatusChip";

const cx = classNames.bind(styles);

const RequestAuthorityList = ({ data }: { data: IRequestAuthority[] }) => {
  return (
    <div className={cx("container")}>
      {data.map((item) => {
        return (
          <div className={cx("content")} key={item.requestAuthorityId}>
            <div className={cx("sender")}>
              <span className={cx("senderNickname")}>{item.sender.nickname}</span>
              {" "}
              님이 어드민 권한을 요청합니다 님이 어드민 권한을 요청합니다 님이 어드민 권한을 요청합니다
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
