import classNames from "classnames/bind";
import dynamic from "next/dynamic";

import CustomLegend from "@/components/common/CustomLegend/CustomLegend";
import { IGetAdminMonthlyTrendsResponse } from "@/services/api/types/admin";
import { IGetArtistMonthlyTrendsResponse } from "@/services/api/types/artist";
import { MEMBER_ROLE, MemberRole } from "@/types/enums/user.enum";

import styles from "./MonthlyTrendsChart.module.scss";

const cx = classNames.bind(styles);

interface MonthlyTrendChartProps {
  barChartData: IGetAdminMonthlyTrendsResponse | IGetArtistMonthlyTrendsResponse,
  type: MemberRole,
}
const DynamicBarChart = dynamic(() => { return import("@/components/common/Chart/BarChart/BarChart"); }, { ssr: false });

/**
 * @author 임병욱
 * @param barChartData - 차트 데이터 contents 값 포함해서 가져오면 됩니다.
 * @param type - SUPER_ADMIN | ADMIN | ARTIST
*/
const MonthlyTrendChart = ({ barChartData, type }: MonthlyTrendChartProps) => {
  return (
    <div className={cx("chartContainer")}>
      <div className={cx("description")}>
        <span>{`월별 ${type === MEMBER_ROLE.ARTIST ? "정산액" : "매출"} 추이`}</span>
        <div className={cx("legendContainer")}>
          {type !== MEMBER_ROLE.ARTIST && <CustomLegend color="#387ffd" text="매출" type="bar" />}
          <CustomLegend color={type === MEMBER_ROLE.ARTIST ? "#387ffd" : "#bfd4f9"} text={type === MEMBER_ROLE.ARTIST ? "정산액" : "회사 이익"} type="bar" />
        </div>
      </div>
      <div className={cx("chartWrapper")}>
        <DynamicBarChart barChartData={barChartData} type={type} />
      </div>
    </div>
  );
};

export default MonthlyTrendChart;
