import {
  useCallback, useEffect, useId, useMemo, useState,
} from "react";

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
import useReissuePassword from "@/services/queries/auth/useReissuePassword";
import useWithdrawMember from "@/services/queries/manage-accounts/useWithdrawMember";
import { IAdminAccount } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import ReissuedPasswordModal from "../PasswordReissueModal/ReissuedPasswordModal";

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
  const [isOpenReissuedPwModal, setIsOpenReissuedPwModal] = useState(false);
  const [newPassword, setNewPassword] = useState<string>();
  const { mutate: deleteAccount } = useWithdrawMember();
  const { mutateAsync: reissuePassword } = useReissuePassword();
  const { showToast } = useToast();
  const reissueModalId = useId();
  const handleDeleteAccount = useCallback((memberId: number, name: string) => {
    deleteAccount({ memberId, name });
    setFocusedAccount(undefined);
  }, [deleteAccount]);

  const handleReissuePassword = useCallback(async (memberId: number, name: string) => {
    const data = await reissuePassword({ memberId });
    if (data) {
      setNewPassword(data.newPassword);
      setIsOpenReissuedPwModal(true);
      showToast(`“${name}" 계정의 비밀번호가 재발급 되었습니다.`, reissueModalId);
    }
    setFocusedAccount(undefined);
  }, [reissuePassword, showToast, reissueModalId]);

  const deleteAlertModalProps = useMemo(() => {
    return {
      type: MODAL_TYPE.CONFIRM,
      title: "계정 탈퇴",
      message: "해당 어드민 계정 ID를 삭제 하시겠습니까?",
      onClose: () => { setFocusedAccount(undefined); },
      onClickProceed: () => {
        handleDeleteAccount(focusedAccount!.memberId, focusedAccount!.nickName);
      },
      proceedBtnText: "네",
      closeBtnText: "아니요",
    };
  }, [focusedAccount, handleDeleteAccount]);
  const reissueAlertModalProps = useMemo(() => {
    return {
      type: MODAL_TYPE.CONFIRM,
      title: "비밀번호 재발급",
      message: `“${focusedAccount?.nickName}” 계정의 비밀번호를 재발급 하시겠습니까?`,
      onClose: () => { setFocusedAccount(undefined); },
      onClickProceed: async () => {
        await handleReissuePassword(focusedAccount!.memberId, focusedAccount!.nickName);
      },
      proceedBtnText: "네",
      closeBtnText: "아니요",
    };
  }, [focusedAccount, handleReissuePassword]);
  const { showAlertModal: showReissueAlertModal } = useAlertModal();
  const { showAlertModal: showDeleteAlertModal } = useAlertModal();

  useEffect(() => {
    if (focusedAccount) {
      if (focusedAccount.target === "reissue") showReissueAlertModal(reissueAlertModalProps);
      if (focusedAccount.target === "delete") showDeleteAlertModal(deleteAlertModalProps);
    }
  }, [
    focusedAccount,
    showReissueAlertModal,
    showDeleteAlertModal,
    reissueAlertModalProps,
    deleteAlertModalProps]);

  return (
    <>
      <TableContainerUI
        stickyLastCol
        tableWidth={1110}
        paginationElement={paginationElement}
      >
        <TableHeaderUI>
          <TableCellUI isHeader>닉네임</TableCellUI>
          <TableCellUI isHeader>계정 ID</TableCellUI>
          <TableCellUI isHeader colWidth={330}>계정 이메일</TableCellUI>
          <TableCellUI isHeader colWidth={232}>비고</TableCellUI>
        </TableHeaderUI>
        <TableBodyUI>
          {accounts.map((account) => {
            return (
              <TableRowUI key={account.memberId}>
                <TableCellUI>
                  <TooltipRoot message={account.nickname}>
                    <p className={cx("ellipsis")}>{account.nickname}</p>
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
                      setFocusedAccount({ memberId: account.memberId, nickName: account.nickname, target: "reissue" });
                    }}
                    >
                      비밀번호 재발급
                    </ChipButton>
                    <ChipButton onClick={() => {
                      setFocusedAccount({ memberId: account.memberId, nickName: account.nickname, target: "delete" });
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
      <ReissuedPasswordModal
        newPassword={newPassword!}
        id={reissueModalId}
        open={isOpenReissuedPwModal}
        onClose={() => { setIsOpenReissuedPwModal(false); }}
      />
    </>
  );
};

export default AdminAccountsTable;
