import classNames from "classnames/bind";

import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import { IArtistAccount } from "@/types/dto";

import styles from "./ArtistAccountsTable.module.scss";

const cx = classNames.bind(styles);

interface ArtistAccountsTableProps {
  accounts: IArtistAccount[]
  paginationElement: React.ReactNode
}

const ArtistAccountsTable = ({ accounts, paginationElement }: ArtistAccountsTableProps) => {
  return (
    <TableContainerUI
      stickyLastCol
      tableWidth={1110}
      paginationElement={paginationElement}
    >
      <TableHeaderUI>
        <TableCellUI isHeader>활동 예명 (한글)</TableCellUI>
        <TableCellUI isHeader>활동 예명 (영문)</TableCellUI>
        <TableCellUI isHeader>계정 ID</TableCellUI>
        <TableCellUI isHeader>계정 이메일</TableCellUI>
        <TableCellUI isHeader>기본 요율</TableCellUI>
        <TableCellUI isHeader colWidth={280}>비고</TableCellUI>
      </TableHeaderUI>
      <TableBodyUI>
        {accounts.map((account) => {
          return (
            <TableRowUI key={account.memberId}>
              <TableCellUI>
                <TooltipRoot message={account.name}>
                  <p className={cx("ellipsis")}>{account.name}</p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <TooltipRoot message={account.enName}>
                  <p className={cx("ellipsis")}>{account.enName}</p>
                </TooltipRoot>
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
                <TooltipRoot message={
                  (typeof account.commissionRate === "number")
                    ? `${account.commissionRate}%` : "-"
                }
                >
                  <p className={cx("ellipsis")}>
                    {
                      (typeof account.commissionRate === "number")
                        ? `${account.commissionRate}%` : "-"
                    }
                  </p>
                </TooltipRoot>
              </TableCellUI>
              <TableCellUI>
                <div className={cx("buttonContainer")}>
                  <ChipButton onClick={() => { }}>비밀번호 재발급</ChipButton>
                  <ChipButton onClick={() => { }}>계정 탈퇴</ChipButton>
                  <ChipButton onClick={() => { }}>수정</ChipButton>
                </div>
              </TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>
  );
};

export default ArtistAccountsTable;
