/* eslint-disable react/no-array-index-key */
import classNames from "classnames/bind";
import { useRouter } from "next/router";

import DoughnutChart from "@/components/common/Chart/DoughnutChart/DoughnutChart";
import { IGetAdminEarningsTopArtistResponse, IGetAdminEarningsTopTrackResponse } from "@/services/api/types/admin";

import styles from "./TopFiveChart.module.scss";
import RouteBasedOnPath from "./TopFiveChart.utils";
import TopFiveChartLegend from "./TopFiveChartLegend";

const cx = classNames.bind(styles);

type TopFiveChartProps = IGetAdminEarningsTopArtistResponse | IGetAdminEarningsTopTrackResponse;

const TopFiveChart = ({ topFiveChartData }: { topFiveChartData: TopFiveChartProps }) => {
  const router = useRouter();

  return (
    <div className={cx("topFiveChartContainer")}>
      <div className={cx("description")}>
        <span>{RouteBasedOnPath(router.asPath)}</span>
      </div>
      <div className={cx("contentContainer")}>
        <div style={{ width: "300px", height: "300px" }}>
          <DoughnutChart doughnutData={topFiveChartData} />
        </div>
        <div className={cx("legendContainer")}>
          {topFiveChartData?.contents.map(((legendData, index) => {
            return (
              <TopFiveChartLegend key={index} legendData={legendData} index={index} />
            );
          }))}
        </div>
      </div>
    </div>
  );
};

export default TopFiveChart;
