import classNames from "classnames/bind";

import { AUTHORITY_STATUS_CHIP_TEXT } from "@/constants/authorityStatusChipText";
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

  // TODO) 승인 & 거절 API 연동
  const handleClickApprove = () => {
    showToast(`승인됨 (requestAuthorityId: ${requestAuthorityId})`);
  };

  const handleClickReject = () => {
    showToast(`거절됨 (requestAuthorityId: ${requestAuthorityId})`);
  };

  if (status !== REQUEST_AUTHORITY_STATUS.PENDING) {
    return <div className={cx("chip", "complete")}>{AUTHORITY_STATUS_CHIP_TEXT[status]}</div>;
  }

  return (
    <>
      <button className={cx("chip", "pending", "approve")} onClick={handleClickApprove}>승인</button>
      <button className={cx("chip", "pending", "reject")} onClick={handleClickReject}>거절</button>
    </>
  );
};

export default StatusChip;
