import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import { IAdminProfile } from "@/types/dto.temp";

import TableBodyUI from "../Composition/TableBodyUI";
import TableCellUI from "../Composition/TableCellUI";
import TableContainerUI from "../Composition/TableContainerUI";
import TableHeaderUI from "../Composition/TableHeaderUI";
import TableRowUI from "../Composition/TableRowUI";

interface AdminAccountsTableProps {
  data: IAdminProfile[]
  paginationElement?: React.ReactNode
}

const AdminAccountsTable = ({ data, paginationElement }: AdminAccountsTableProps) => {
  return (
    <TableContainerUI
      paginationElement={paginationElement}
      stickyLastCol
      tableWidth={1200}
    >
      <TableHeaderUI>
        <TableCellUI isHeader>계정 ID</TableCellUI>
        <TableCellUI isHeader>닉네임</TableCellUI>
        <TableCellUI isHeader>타입</TableCellUI>
        <TableCellUI isHeader>계정 이메일</TableCellUI>
        <TableCellUI isHeader>비고</TableCellUI>
      </TableHeaderUI>
      <TableBodyUI>
        {data.map((item) => {
          return (
            <TableRowUI key={item.loginId}>
              <TableCellUI>{item.loginId}</TableCellUI>
              <TableCellUI>{item.nickName}</TableCellUI>
              <TableCellUI>{item.type}</TableCellUI>
              <TableCellUI>{item.email}</TableCellUI>
              <TableCellUI>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
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
