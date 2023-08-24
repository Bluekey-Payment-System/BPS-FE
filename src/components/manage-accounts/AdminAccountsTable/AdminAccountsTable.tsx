import classNames from "classnames/bind";

import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import { IAdminAccount } from "@/types/dto";

import styles from "./AdminAccountsTable.module.scss";

const cx = classNames.bind(styles);

interface AdminAccountsTableProps {
  accounts: IAdminAccount[]
  paginationElement: React.ReactNode
}

const AdminAccountsTable = ({ accounts, paginationElement }: AdminAccountsTableProps) => {
  return (
    <TableContainerUI
      stickyLastCol
      tableWidth={1110}
      paginationElement={paginationElement}
    >
      <TableHeaderUI>
        <TableCellUI isHeader>닉네임</TableCellUI>
        <TableCellUI isHeader>계정 ID</TableCellUI>
        <TableCellUI isHeader>계정 이메일</TableCellUI>
        <TableCellUI isHeader>비고</TableCellUI>
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
                  <ChipButton onClick={() => { }}>비밀번호 재발급</ChipButton>
                  <ChipButton onClick={() => { }}>계정 탈퇴</ChipButton>
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
