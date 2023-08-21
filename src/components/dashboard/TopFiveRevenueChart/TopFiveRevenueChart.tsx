/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import classNames from "classnames/bind";
import { useRouter } from "next/router";

import DoughnutChart from "@/components/common/Chart/DoughnutChart/DoughnutChart";
import { IGetAdminEarningsTopArtistResponse } from "@/services/api/types/admin";
import { IGetAlbumRevenueTopTrackResponse } from "@/services/api/types/albums";

import styles from "./TopFiveRevenueChart.module.scss";
import routeBasedOnPath from "./TopFiveRevenueChart.utils";
import TopFiveRevenueChartLegend from "./TopFiveRevenueChartLegend";

const cx = classNames.bind(styles);

type TopFiveRevenueChartProps = IGetAdminEarningsTopArtistResponse | IGetAlbumRevenueTopTrackResponse;

const TopFiveRevenueChart = ({ topFiveChartData }: { topFiveChartData: TopFiveRevenueChartProps }) => {
  const router = useRouter();

  return (
    <div className={cx("topFiveChartContainer")}>
      <div className={cx("description")}>
        <span>{routeBasedOnPath(router.asPath)}</span>
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
