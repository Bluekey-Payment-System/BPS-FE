import classNames from "classnames/bind";

import useToast from "@/hooks/useToast";
import { REQUEST_AUTHORITY_STATUS, RequestAuthorityStatus } from "@/types/enums/authority.enum";

import styles from "./StatusChip.module.scss";

const cx = classNames.bind(styles);

interface StatusChipProps {
  status: RequestAuthorityStatus;
  requestAuthorityId: number;
}

const StatusChip = ({ status, requestAuthorityId }: StatusChipProps) => {
  const { showToast } = useToast();

  const handleChangeStatus = () => {
    showToast(`승인 또는 거절: ${requestAuthorityId}`);
  };

  if (status === REQUEST_AUTHORITY_STATUS.APPROVED) {
    return <div className={cx("chip", "complete")}>승인됨</div>;
  }

  if (status === REQUEST_AUTHORITY_STATUS.REJECTED) {
    return <div className={cx("chip", "complete")}>거절됨</div>;
  }

  if (status === REQUEST_AUTHORITY_STATUS.AUTO_REJECTED) {
    return <div className={cx("chip", "complete")}>자동 거절됨</div>;
  }

  return (
    <>
      <button className={cx("chip", "pending", "approve")} onClick={handleChangeStatus}>승인</button>
      <button className={cx("chip", "pending", "reject")} onClick={handleChangeStatus}>거절</button>
    </>
  );
};

export default StatusChip;
