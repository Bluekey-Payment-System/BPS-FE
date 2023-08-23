import Chip from "@/components/common/Chip/Chip";
import TableBodyUI from "@/components/common/Table/Composition/TableBodyUI";
import TableCellUI from "@/components/common/Table/Composition/TableCellUI";
import TableContainerUI from "@/components/common/Table/Composition/TableContainerUI";
import TableHeaderUI from "@/components/common/Table/Composition/TableHeaderUI";
import TableRowUI from "@/components/common/Table/Composition/TableRowUI";
import { IArtistList } from "@/types/dto";
import formatMoney from "@/utils/formatMoney";

import ArtistProfileImage from "../ArtistProfileImage/ArtistProfileImage";

interface ArtistsStatusTableProps {
  artistList: IArtistList[],
  paginationElement: React.ReactNode
}

const ArtistsStatusTable = ({
  artistList, paginationElement,
}: ArtistsStatusTableProps) => {
  return (
    <TableContainerUI
      paginationElement={paginationElement}
      stickyFirstCol
      tableWidth={1200}
    >
      <TableHeaderUI>
        <TableCellUI isHeader colWidth={90}> </TableCellUI>
        {/* TODO: 아티스트 한영문 통합 & 프로필 이미지 테이블 cell width 조정 */}
        <TableCellUI isHeader>아티스트명</TableCellUI>
        <TableCellUI isHeader>매출액</TableCellUI>
        <TableCellUI isHeader>회사 이익</TableCellUI>
        <TableCellUI isHeader>정산액</TableCellUI>
        <TableCellUI isHeader colWidth={350}>당월 대표곡</TableCellUI>
        <TableCellUI isHeader>전월 대비 상승/하락율</TableCellUI>
      </TableHeaderUI>
      <TableBodyUI>
        {artistList.map((artistInfo) => {
          return (
            <TableRowUI key={artistInfo.artist.memberId}>
              <TableCellUI>
                <ArtistProfileImage
                  memberId={artistInfo.artist.memberId}
                  profileImageUrl={artistInfo.artist.profileImage}
                />
              </TableCellUI>
              <TableCellUI>{artistInfo.artist.koArtistName}</TableCellUI>
              <TableCellUI>{`${formatMoney(artistInfo.revenue, "table")}원`}</TableCellUI>
              <TableCellUI>{`${formatMoney(artistInfo.netIncome, "table")}원`}</TableCellUI>
              <TableCellUI>{`${formatMoney(artistInfo.settlementAmount, "table")}원`}</TableCellUI>
              <TableCellUI>{artistInfo.representativeTrack}</TableCellUI>
              <TableCellUI>
                <Chip percentage={artistInfo.monthlyIncreaseRate} />
              </TableCellUI>
            </TableRowUI>
          );
        })}
      </TableBodyUI>
    </TableContainerUI>

  );
};

export default ArtistsStatusTable;
