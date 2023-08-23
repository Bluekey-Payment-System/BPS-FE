import { useEffect, useState } from "react";

import classNames from "classnames/bind";

import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import useAlertModal from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import { IAdminAccount } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import styles from "./AdminAccountsTable.module.scss";

const cx = classNames.bind(styles);

interface IFocusedAccount {
  memberId: number
  nickName: string
  target: "delete" | "reissue"
}

interface AdminAccountsTableProps {
  accounts: IAdminAccount[]
  paginationElement: React.ReactNode
}

const AdminAccountsTable = ({ accounts, paginationElement }: AdminAccountsTableProps) => {
  const [focusedAccount, setFocusedAccount] = useState<IFocusedAccount>();
  const [isOpenDeleteAccModal, setIsOpenDeleteAccModal] = useState(false);
  const [isOpenReissuePwModal, setIsOpenReissuePwModal] = useState(false);
  const { showToast } = useToast();
  const handleDeleteAccount = (memberId: number, nickName: string) => {
    // TODO: 계정 delete api 달기
    showToast(`“${nickName}” 계정이 삭제되었습니다.`);
    setFocusedAccount(undefined);
  };

  const handleReissuePassword = (memberId: number, nickName: string) => {
    // TODO: 모달
    showToast(`“${nickName}" 계정의 비밀번호가 재발급 되었습니다.`);
    setFocusedAccount(undefined);
  };

  const deleteAlertModalProps = {
    open: isOpenDeleteAccModal,
    type: MODAL_TYPE.CONFIRM,
    title: "계정 탈퇴",
    message: "해당 어드민 계정 ID를 삭제 하시겠습니까?",
    onClose: () => { setIsOpenDeleteAccModal(false); },
    onClickProceed: () => {
      handleDeleteAccount(focusedAccount!.memberId, focusedAccount!.nickName);
    },
    proceedBtnText: "네",
    closeBtnText: "아니요",
  };
  const reissueAlertModalProps = {
    open: isOpenReissuePwModal,
    type: MODAL_TYPE.CONFIRM,
    title: "비밀번호 재발급",
    message: `“${focusedAccount?.nickName}” 계정의 비밀번호를 재발급 하시겠습니까?`,
    onClose: () => { setIsOpenReissuePwModal(false); },
    onClickProceed: () => {
      handleReissuePassword(focusedAccount!.memberId, focusedAccount!.nickName);
    },
    proceedBtnText: "네",
    closeBtnText: "아니요",
  };
  const { showAlertModal: showReissueAlertModal } = useAlertModal(reissueAlertModalProps);
  const { showAlertModal: showDeleteAlertModal } = useAlertModal(deleteAlertModalProps);

  useEffect(() => {
    if (focusedAccount) {
      if (focusedAccount.target === "reissue") showReissueAlertModal();
      else showDeleteAlertModal();
    }
  }, [focusedAccount, showDeleteAlertModal, showReissueAlertModal]);

  return (
    <TableContainerUI
      stickyLastCol
      tableWidth={1110}
      paginationElement={paginationElement}
    >
      <TableHeaderUI>
        <TableCellUI isHeader>닉네임</TableCellUI>
        <TableCellUI isHeader>계정 ID</TableCellUI>
        {/* // TODO: 어드민 타입? */}
        <TableCellUI isHeader colWidth={330}>계정 이메일</TableCellUI>
        <TableCellUI isHeader colWidth={232}>비고</TableCellUI>
      </TableHeaderUI>
      <TableBodyUI>
        {accounts.map((account) => {
          return (
            <TableRowUI key={account.memberId}>
              <TableCellUI>
                <TooltipRoot message={account.nickName}>
                  <p className={cx("ellipsis")}>{account.nickName}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <TooltipRoot message={account.loginId}>
                  <p className={cx("ellipsis")}>{account.loginId}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <TooltipRoot message={account.email}>
                  <p className={cx("ellipsis")}>{account.email}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <div className={cx("buttonContainer")}>
                  <ChipButton onClick={() => {
                    setFocusedAccount({ memberId: account.memberId, nickName: account.nickName, target: "reissue" });
                  }}
                  >
                    비밀번호 재발급
                  </ChipButton>
                  <ChipButton onClick={() => {
                    setFocusedAccount({ memberId: account.memberId, nickName: account.nickName, target: "delete" });
                  }}
                  >
                    계정 탈퇴
                  </ChipButton>
                </div>
              </TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>
  );
};

export default AdminAccountsTable;
