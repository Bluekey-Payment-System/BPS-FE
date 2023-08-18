import classNames from "classnames/bind";

import { chartColor } from "@/components/common/Chart/chart.utils";
import DoughnutChart from "@/components/common/Chart/DoughnutChart/DoughnutChart";
import Chip from "@/components/common/Chip/Chip";
import CustomLegend from "@/components/common/CustomLegend/CustomLegend";
import { IGetAdminEarningsTopArtistResponse } from "@/services/api/types/admin";
import { MemberType } from "@/types/enums/user.enum";
import formatMoney from "@/utils/formatMoney";

import styles from "./TopFiveChart.module.scss";

const cx = classNames.bind(styles);

interface TopFiveChartProps {
  topFiveChartData: IGetAdminEarningsTopArtistResponse,
  type: MemberType
}

const TopFiveChart = ({ topFiveChartData, type }: TopFiveChartProps) => {
  return (
    <div className={cx("topFiveChartContainer")}>
      <div className={cx("description")}>
        <span>당월 Top 5 아티스트 매출 비중</span>
      </div>
      <div className={cx("contentContainer")}>
        <div style={{ width: "300px", height: "300px" }}>
          <DoughnutChart doughnutData={topFiveChartData} />
        </div>
        <div className={cx("legendContainer")}>
          {topFiveChartData?.contents.map(((legendData, index) => {
            return (
              <>
                <CustomLegend
                  key={chartColor[index]}
                  color={chartColor[index]}
                  value={legendData.artist.koName}
                  type="doughnut"
                />
                <p className={cx("fomattedMoney")}>{formatMoney(legendData.revenue, "chart")}</p>
                <Chip percentage={legendData.growthRate} />
              </>
            );
          }))}
        </div>
      </div>
    </div>
  );
};

export default TopFiveChart;
