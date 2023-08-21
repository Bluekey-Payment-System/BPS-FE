import { useSelector } from "react-redux";

import classNames from "classnames/bind";

import AlbumDetailsInformationTooltip from "@/components/album/albumDetailsInformationTooltip/AlbumDetailsInformationTooltip";
import { DashboardCardProps } from "@/components/common/DashboardCard/DashboardCard.type";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import AlbumTrendsChart from "@/components/dashboard/AlbumTrendsChart/AlbumTrendsChart";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendsChart/MonthlyTrendsChart";
import TopFiveRevenueChart from "@/components/dashboard/TopFiveRevenueChart/TopFiveRevenueChart";
import { MOCK_ALBUM_BAR, MOCK_ALBUM_DOUGHNUT, MOCK_ALBUM_LINE } from "@/constants/mock";
import { IState } from "@/redux/store";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import formatMoney from "@/utils/formatMoney";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const cardsData: DashboardCardProps[] = [
  { title: "이 앨범의 당월 정산액", content: formatMoney(10000000000000000, "card"), growthRate: 2.1 },
  { title: "2023년 8월의 트랙", content: formatMoney(1000000, "card"), growthRate: -2.1 },
];

const AlbumDashboardPage = () => {
  const memberType = useSelector<IState>((state) => { return state.user.member!.type; });

  return (
    <section className={cx("container")}>
      <div className={cx("sectionHeader")}>
        <h1 className={cx("title")}>앨범명</h1>
        {memberType === MEMBER_TYPE.ARTIST && <AlbumDetailsInformationTooltip />}
        <div className={cx("monthPickerDropdownContainer", { artist: memberType === MEMBER_TYPE.ARTIST })}>
          <MonthPickerDropdown />
        </div>
        <button className={cx("albumInfo")}>앨범 정보 보기</button>
      </div>
      <DashboardCardList data={cardsData} />
      <div className={cx("chartContainer")}>
        <MonthlyTrendChart barChartData={MOCK_ALBUM_BAR} type={MEMBER_TYPE.ARTIST} />
        <TopFiveRevenueChart topFiveChartData={MOCK_ALBUM_DOUGHNUT} />
      </div>
      <AlbumTrendsChart albumTrendsChartData={MOCK_ALBUM_LINE} memberType={MEMBER_TYPE.ARTIST} />
    </section>
  );
};

export default AlbumDashboardPage;
