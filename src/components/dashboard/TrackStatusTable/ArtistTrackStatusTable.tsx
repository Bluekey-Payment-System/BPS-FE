/* eslint-disable function-call-argument-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable max-len */
import { useState, useRef } from "react";

import classNames from "classnames/bind";
import { useRouter } from "next/router";

import Dropdown from "@/components/common/Dropdown/Dropdown";
import Filter from "@/components/common/Filter/Filter";
import { IFilterOptions } from "@/components/common/Filter/Filter.type";
import Spacing from "@/components/common/Layouts/Spacing";
import ProgressBar from "@/components/common/ProgressBar/ProgressBar";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import {
  REVERSE_SEARCH_BY_OPTIONS_MAP, REVERSE_SORT_BY_OPTIONS_MAP, SEARCH_BY_OPTIONS_MAP, SORT_BY_OPTIONS_MAP,
} from "@/constants/trackStatusTable";
import { ITrackTransaction } from "@/types/dto";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import formatMoney from "@/utils/formatMoney";
import updateQueryParam from "@/utils/updateQueryParam";

import EmptyTrackTableData from "./EmptyTrackTableData";
import styles from "./TrackStatusTable.module.scss";

const cx = classNames.bind(styles);

interface ArtistTrackStatusTableProps {
  title: string
  data: Omit<ITrackTransaction, "netIncome">[]
  isEmpty?: boolean
  paginationElement?: React.ReactNode
  searchBy: string
  sortBy: string
}

const ArtistTrackStatusTable = ({
  title, data, isEmpty = false, paginationElement, searchBy, sortBy,
}: ArtistTrackStatusTableProps) => {
  const router = useRouter();
  const [searchByValue, setSearchByValue] = useState(SEARCH_BY_OPTIONS_MAP[searchBy] ?? "곡 명");
  const searchBarRef = useRef<HTMLInputElement>(null);

  const handleClickSortByDropdown = (value: string) => {
    router.push(updateQueryParam(
      router.query,
      "sortBy",
      REVERSE_SORT_BY_OPTIONS_MAP[value],
      "page",
      1,
    ), undefined, { scroll: false });
  };

  const handleClickSearchByDropdown = (value: string) => {
    setSearchByValue(value);
  };

  const handleClickSearchBar = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push(updateQueryParam(
      router.query,
      "searchBy",
      REVERSE_SEARCH_BY_OPTIONS_MAP[searchByValue],
      "keyword",
      searchBarRef.current?.value ?? "",
      "page",
      1,
    ), undefined, { scroll: false });
  };

  const handleSubmitFilter = (options: IFilterOptions) => {
    const {
      mId, revFr, revTo, netFr, netTo, setFr, setTo, comFr, comTo,
    } = options;
    router.push(updateQueryParam(
      router.query,
      "mId", mId,
      "revFr", revFr,
      "revTo", revTo,
      "netFr", netFr,
      "netTo", netTo,
      "setFr", setFr,
      "setTo", setTo,
      "comFr", comFr,
      "comTo", comTo,
      "page", 1), undefined, { scroll: false });
  };

  return (
    <section className={cx("container")}>
      <div className={cx("titleContainer")}>
        <h2 className={cx("title")}>{title}</h2>
        <div className={cx("utilContainer")}>
          <Dropdown
            dropdownListData={Object.values(SORT_BY_OPTIONS_MAP).filter((option) => { return option !== "회사 이익순"; })}
            initialValue={SORT_BY_OPTIONS_MAP[sortBy] ?? "매출순"}
            onClick={handleClickSortByDropdown}
          />
          <Spacing direction="horizontal" size={18} />
          <Filter onSubmit={handleSubmitFilter} />
          <Spacing direction="horizontal" size={32} />
          <Dropdown
            theme="withSearchBar"
            onClick={handleClickSearchByDropdown}
            dropdownListData={Object.values(SEARCH_BY_OPTIONS_MAP)}
            initialValue={searchByValue}
          />
          <form onSubmit={handleClickSearchBar}>
            <SearchBar placeholder="검색어를 입력해주세요" theme="withSearchBar" onClick={handleClickSearchBar} value={(router.query?.keyword ?? "") as string} ref={searchBarRef} />
          </form>
        </div>
      </div>
      {isEmpty
        ? <EmptyTrackTableData type={DASHBOARD_TYPE.ARTIST} isEmptySearch={!!router.query.keyword} />
        : (
          <TableContainerUI
            paginationElement={paginationElement}
            stickyFirstCol
            tableWidth={1200}
          >
            <TableHeaderUI>
              <TableCellUI isHeader>곡명</TableCellUI>
              <TableCellUI isHeader>앨범명</TableCellUI>
              <TableCellUI isHeader>정산액(세후)</TableCellUI>
              <TableCellUI isHeader align="left">요율</TableCellUI>
            </TableHeaderUI>
            <TableBodyUI>
              {data.map((item) => {
                return (
                  <TableRowUI key={item.track.trackId}>
                    <TableCellUI>
                      <TooltipRoot message={item.track.name}>
                        <p className={cx("ellipsis")}>{item.track.name}</p>
                      </TooltipRoot>
                    </TableCellUI>
                    <TableCellUI>
                      <TooltipRoot message={item.album.name}>
                        <p className={cx("ellipsis")}>{item.album.name}</p>
                      </TooltipRoot>
                    </TableCellUI>
                    {/* <TableCellUI>
                      <TooltipRoot message={formatArtistCell(item.artists)}>
                        <p className={cx("artistName", "ellipsis")}>{formatArtistCell(item.artists)}</p>
                        <p className={cx("artistName", "enName", "ellipsis")}>{item.artists[0].enName}</p>
                      </TooltipRoot>
                    </TableCellUI> */}
                    <TableCellUI>{formatMoney(item.settlementAmount, "table")}</TableCellUI>
                    <TableCellUI align="left"><ProgressBar value={item.commissionRate} /></TableCellUI>
                  </TableRowUI>
                );
              })}
            </TableBodyUI>
          </TableContainerUI>
        )}
    </section>
  );
};

export default ArtistTrackStatusTable;
