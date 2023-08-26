/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from "classnames/bind";

import Dropdown from "@/components/common/Dropdown/Dropdown";
import Filter from "@/components/common/Filter/Filter";
import Spacing from "@/components/common/Layouts/Spacing";
import ProgressBar from "@/components/common/ProgressBar/ProgressBar";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import { ITrackTransaction } from "@/types/dto";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import formatMoney from "@/utils/formatMoney";

import EmptyTableData from "./EmptyTableData";
import styles from "./TrackStatusTable.module.scss";
import { formatArtistCell } from "./TrackStatusTable.utils";

const cx = classNames.bind(styles);

interface AdminTrackStatusTableProps {
  title: string
  data: ITrackTransaction[]
  isEmpty?: boolean
  paginationElement?: React.ReactNode
}

const AdminTrackStatusTable = ({
  title, data, isEmpty = false, paginationElement,
}: AdminTrackStatusTableProps) => {
  const handleClickSortByDropdown = (value: string) => {
    // TODO: 정렬 순서 쿼리 파람 변경
  };

  const handleClickSearchByDropdown = (value: string) => {
    // TODO: 검색 기준 변경
  };

  const handleClickSearchBar = () => {
    // TODO: 검색 키워드 쿼리 파람 변경
  };

  return (
    <section className={cx("container")}>
      <div className={cx("titleContainer")}>
        <h2 className={cx("title")}>{title}</h2>
        <div className={cx("utilContainer")}>
          <Dropdown
            dropdownListData={["매출순", "회사 이익순", "정산액순", "요율순"]}
            onClick={handleClickSortByDropdown}
          />
          <Spacing direction="horizontal" size={18} />
          <Filter />
          <Spacing direction="horizontal" size={32} />
          <Dropdown
            dropdownListData={["곡 명", "앨범 명"]}
            theme="withSearchBar"
            onClick={handleClickSearchByDropdown}
          />
          <SearchBar placeholder="검색어를 입력해주세요" theme="withSearchBar" onClick={handleClickSearchBar} value="" />
        </div>
      </div>
      {isEmpty
        ? <EmptyTableData type={DASHBOARD_TYPE.ADMIN} />
        : (
          <TableContainerUI
            paginationElement={paginationElement}
            stickyFirstCol
            tableWidth={1200}
          >
            <TableHeaderUI>
              <TableCellUI isHeader>곡명</TableCellUI>
              <TableCellUI isHeader>앨범명</TableCellUI>
              <TableCellUI isHeader>아티스트명</TableCellUI>
              <TableCellUI isHeader>매출액</TableCellUI>
              <TableCellUI isHeader>회사 이익</TableCellUI>
              <TableCellUI isHeader>정산액</TableCellUI>
              <TableCellUI isHeader align="left">요율</TableCellUI>
            </TableHeaderUI>
            <TableBodyUI>
              {data.map((item) => {
                return (
                  <TableRowUI key={item.track.trackId}>
                    <TableCellUI>
                      <TooltipRoot message={item.track.koTrackName}>
                        <p className={cx("ellipsis")}>{item.track.koTrackName}</p>
                      </TooltipRoot>
                    </TableCellUI>
                    <TableCellUI>
                      <TooltipRoot message={item.album.koAlbumName}>
                        <p className={cx("ellipsis")}>{item.album.koAlbumName}</p>
                      </TooltipRoot>
                    </TableCellUI>
                    <TableCellUI>
                      <div>
                        <TooltipRoot message={formatArtistCell(item.artists)}>
                          <p className={cx("artistName", "ellipsis")}>{formatArtistCell(item.artists)}</p>
                          <p className={cx("artistName", "enName", "ellipsis")}>{item.artists[0].enArtistName}</p>
                        </TooltipRoot>
                      </div>
                    </TableCellUI>
                    <TableCellUI>{formatMoney(item.revenue, "table")}</TableCellUI>
                    <TableCellUI>{formatMoney(item.netIncome, "table")}</TableCellUI>
                    <TableCellUI>{formatMoney(item.settlementAmount, "table")}</TableCellUI>
                    <TableCellUI align="left">{item.commissionRate && <ProgressBar value={item.commissionRate} />}</TableCellUI>
                  </TableRowUI>
                );
              })}
            </TableBodyUI>
          </TableContainerUI>
        )}
    </section>
  );
};

export default AdminTrackStatusTable;
