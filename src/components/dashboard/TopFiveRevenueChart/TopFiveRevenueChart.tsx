/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import classNames from "classnames/bind";
import { useRouter } from "next/router";

import DoughnutChart from "@/components/common/Chart/DoughnutChart/DoughnutChart";
import { IGetAdminEarningsTopArtistResponse } from "@/services/api/types/admin";
import { IGetAlbumRevenueTopTrackResponse } from "@/services/api/types/albums";
import { MemberRole } from "@/types/enums/user.enum";

import styles from "./TopFiveRevenueChart.module.scss";
import getHeaderText from "./TopFiveRevenueChart.utils";
import TopFiveRevenueChartLegend from "./TopFiveRevenueChartLegend";

const cx = classNames.bind(styles);

interface TopFiveRevenueChartProps {
  topFiveChartData: IGetAdminEarningsTopArtistResponse | IGetAlbumRevenueTopTrackResponse;
  type: MemberRole
}

/**
 * @author 임병욱
 * @param topFiveChartData - 차트 데이터 contents 값 포함해서 가져오면 됩니다
*/
const TopFiveRevenueChart = ({ topFiveChartData, type }: TopFiveRevenueChartProps) => {
  const router = useRouter();

  if (topFiveChartData.contents.length === 0) {
    // eslint-disable-next-line no-param-reassign
    topFiveChartData.contents = [
      {
        artist: {
          memberId: -1,
          name: "-",
          enName: "",
        },
        revenue: null,
        growthRate: null,
        proportion: 100,
      },
    ];
  }

  return (
    <div className={cx("topFiveChartContainer")}>
      <div className={cx("description")}>
        <span>{getHeaderText(router.asPath, type)}</span>
      </div>
      <div className={cx("contentContainer")}>
        <div style={{ width: "300px", height: "300px" }}>
          <DoughnutChart doughnutData={topFiveChartData} />
        </div>
        <div className={cx("legendContainer")}>
          {topFiveChartData?.contents.map(((legendData, index) => {
            return (
              <TopFiveRevenueChartLegend key={index} legendData={legendData} index={index} />
            );
          }))}
        </div>
      </div>
    </div>
  );
};

export default TopFiveRevenueChart;
