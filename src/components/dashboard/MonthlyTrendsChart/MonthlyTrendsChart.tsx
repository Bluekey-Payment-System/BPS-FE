import classNames from "classnames/bind";
import dynamic from "next/dynamic";

import { MemberType } from "@/types/enums/user.enum";

import { ChartDataProps } from "../common/Chart/BarChart/BarChart.types";
import CustomLegend from "../common/CustomLegend/CustomLegend";

import styles from "./MonthlyTrendsChart.module.scss";

const cx = classNames.bind(styles);

interface MonthlyTrendChartProps {
  barChartData: ChartDataProps[],
  type: MemberType,
}
const DynamicBarChart = dynamic(() => { return import("@/components/common/Chart/BarChart/BarChart"); }, { ssr: false });

/**
 * @author 임병욱
 * @param barChartData - 차트 데이터이며 content를 제외완 [{month: 1, revenue: 1000000, settlement: 10000},] 형식
 * @param type - SUPER_ADMIN | ADMIN | ARTIST
*/
const MonthlyTrendChart = ({ barChartData, type }: MonthlyTrendChartProps) => {
  return (
    <div className={cx("chartContainer")}>
      <div className={cx("description")}>
        <span>{`월별 ${type === "ARTIST" ? "정산액" : "매출"} 추이`}</span>
        <div className={cx("legendContainer")}>
          <CustomLegend color="#bfd4f9" text={type === "ARTIST" ? "정산액" : "회사 이익"} type="bar" />
          <CustomLegend color="#387ffd" text="매출" type="bar" />
        </div>
      </div>
      <div className={cx("chartWrapper")}>
        <DynamicBarChart barChartData={barChartData} type={type} />
      </div>
    </div>
  );
};

export default MonthlyTrendChart;
