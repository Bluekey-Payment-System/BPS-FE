import {
  useState, useEffect, useMemo, useCallback,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
import useUpdateArtistProfile from "@/services/queries/manage-accounts/useUpdateArtistProfile";
import useWithdrawMember from "@/services/queries/manage-accounts/useWithdrawMember";
import { IArtistAccount } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { generateRandomStringWithRegex } from "@/utils/generateRandomStringWithRegex";

import ReissuedPasswordModal from "../PasswordReissueModal/ReissuedPasswordModal";

import styles from "./ArtistAccountsTable.module.scss";
import { formatCommissionRate } from "./ArtistAccountsTable.utils";

const cx = classNames.bind(styles);

interface IFocusedAccount {
  memberId: number
  name: string
  target: "delete" | "reissue" | "edit"
}

interface ArtistAccountsTableProps {
  accounts: IArtistAccount[]
  paginationElement: React.ReactNode
}

interface IUpdateAccountFieldValues {
  name: string;
  enName: string;
  commissionRate: number;
}

const ArtistAccountsTable = ({ accounts, paginationElement }: ArtistAccountsTableProps) => {
  const [focusedAccount, setFocusedAccount] = useState<IFocusedAccount>();
  const [isOpenReissuedPwModal, setIsOpenReissuedPwModal] = useState(false);
  const [newPassword, setNewPassword] = useState<string>();
  const { mutate: deleteAccount } = useWithdrawMember();
  const { mutateAsync: updateAccount } = useUpdateArtistProfile();
  const { showToast } = useToast();
  const { register, handleSubmit } = useForm<IUpdateAccountFieldValues>();
  const handleDeleteAccount = useCallback((memberId: number, name: string) => {
    deleteAccount({ memberId, name });
    setFocusedAccount(undefined);
  }, [deleteAccount]);

  const handleReissuePassword = useCallback((memberId: number, name: string) => {
    setNewPassword(generateRandomStringWithRegex(/^[a-zA-Z0-9@$!%*?&_-]*$/, 6, 18));
    // TODO: 계정 pw 변경 api 달기
    showToast(`“${name}" 계정의 비밀번호가 재발급 되었습니다.`);
    setFocusedAccount(undefined);
    setIsOpenReissuedPwModal(true);
  }, [showToast]);

  const deleteAlertModalProps = useMemo(() => {
    return {
      type: MODAL_TYPE.CONFIRM,
      title: "계정 탈퇴",
      message: "해당 아티스트 계정 ID를 삭제 하시겠습니까?",
      onClose: () => { setFocusedAccount(undefined); },
      onClickProceed: () => {
        handleDeleteAccount(focusedAccount!.memberId, focusedAccount!.name);
      },
      proceedBtnText: "네",
      closeBtnText: "아니요",
    };
  }, [focusedAccount, handleDeleteAccount]);
  const reissueAlertModalProps = useMemo(() => {
    return {
      type: MODAL_TYPE.CONFIRM,
      title: "비밀번호 재발급",
      message: `“${focusedAccount?.name}” 계정의 비밀번호를 재발급 하시겠습니까?`,
      onClose: () => { setFocusedAccount(undefined); },
      onClickProceed: () => {
        handleReissuePassword(focusedAccount!.memberId, focusedAccount!.name);
      },
      proceedBtnText: "네",
      closeBtnText: "아니요",
    };
  }, [focusedAccount, handleReissuePassword]);
  const { showAlertModal: showReissueAlertModal } = useAlertModal();
  const { showAlertModal: showDeleteAlertModal } = useAlertModal();

  const onSubmit: SubmitHandler<IUpdateAccountFieldValues> = async (data) => {
    await updateAccount({ memberId: focusedAccount!.memberId, patchData: data });
    setFocusedAccount(undefined);
  };

  useEffect(() => {
    if (focusedAccount) {
      if (focusedAccount.target === "reissue") showReissueAlertModal(reissueAlertModalProps);
      if (focusedAccount.target === "delete") showDeleteAlertModal(deleteAlertModalProps);
    }
  }, [focusedAccount,
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
          <TableCellUI isHeader>활동 예명 (한글)</TableCellUI>
          <TableCellUI isHeader>활동 예명 (영문)</TableCellUI>
          <TableCellUI isHeader>계정 ID</TableCellUI>
          <TableCellUI isHeader colWidth={250}>계정 이메일</TableCellUI>
          <TableCellUI isHeader colWidth={100}>기본 요율</TableCellUI>
          <TableCellUI isHeader colWidth={280}>비고</TableCellUI>
        </TableHeaderUI>
        <TableBodyUI>
          {accounts.map((account) => {
            return (
              <TableRowUI key={account.memberId}>
                <TableCellUI>
                  {focusedAccount?.memberId === account.memberId && focusedAccount.target === "edit"
                    ? (
                      <input
                        className={cx("input")}
                        {...register("name")}
                        defaultValue={account.name}
                        form="updateForm"
                      />
                    )
                    : (
                      <TooltipRoot message={account.name}>
                        <p className={cx("ellipsis")}>{account.name}</p>
                      </TooltipRoot>
                    )}
                </TableCellUI>
                <TableCellUI>
                  {focusedAccount?.memberId === account.memberId && focusedAccount.target === "edit"
                    ? (
                      <input
                        className={cx("input")}
                        {...register("enName")}
                        defaultValue={account.enName}
                        form="updateForm"
                      />
                    )
                    : (
                      <TooltipRoot message={account.enName}>
                        <p className={cx("ellipsis")}>{account.enName}</p>
                      </TooltipRoot>
                    )}
                </TableCellUI>
                <TableCellUI>
                  <TooltipRoot message={account.loginId}>
                    <p className={cx("ellipsis")}>{account.loginId}</p>
                  </TooltipRoot>
                </TableCellUI>
                <TableCellUI>
                  <TooltipRoot message={account.email ?? "-"}>
                    <p className={cx("ellipsis")}>{account.email ?? "-"}</p>
                  </TooltipRoot>
                </TableCellUI>
                <TableCellUI>
                  {focusedAccount?.memberId === account.memberId && focusedAccount.target === "edit"
                    ? (
                      <input
                        className={cx("input")}
                        {...register("commissionRate", {
                          setValueAs: (v: string) => { return parseInt(v, 10); },
                        })}
                        defaultValue={account.commissionRate || undefined}
                        type="number"
                        form="updateForm"
                        min={0}
                        max={100}
                      />
                    )
                    : (
                      <TooltipRoot message={formatCommissionRate(account.commissionRate)}>
                        <p className={cx("ellipsis")}>
                          {formatCommissionRate(account.commissionRate)}
                        </p>
                      </TooltipRoot>
                    )}
                </TableCellUI>
                <TableCellUI>
                  <div className={cx("buttonContainer")}>
                    {focusedAccount?.memberId === account.memberId && focusedAccount.target === "edit"
                      ? (
                        <>
                          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                          <form id="updateForm" onSubmit={handleSubmit(onSubmit)}>
                            <ChipButton
                              form="updateForm"
                              type="submit"
                            >
                              수정 완료
                            </ChipButton>
                          </form>
                        </>
                      )
                      : (
                        <>
                          <ChipButton
                            onClick={() => {
                              setFocusedAccount({ memberId: account.memberId, name: account.name, target: "edit" });
                            }}
                          >
                            수정
                          </ChipButton>
                          <ChipButton
                            onClick={() => {
                              setFocusedAccount({ memberId: account.memberId, name: account.name, target: "delete" });
                            }}
                          >
                            계정 탈퇴
                          </ChipButton>
                          <ChipButton onClick={() => {
                            setFocusedAccount({ memberId: account.memberId, name: account.name, target: "reissue" });
                          }}
                          >
                            비밀번호 재발급
                          </ChipButton>
                        </>
                      )}
                  </div>
                </TableCellUI>
              </TableRowUI>
            );
          })}
        </TableBodyUI>
      </TableContainerUI>
      <ReissuedPasswordModal
        newPassword={newPassword!}
        open={isOpenReissuedPwModal}
        onClose={() => { setIsOpenReissuedPwModal(false); }}
      />
    </>
  );
};

export default ArtistAccountsTable;
