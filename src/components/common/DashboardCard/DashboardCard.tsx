import classNames from "classnames/bind";

import Chip from "@/components/common/Chip/Chip";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";

import styles from "./DashboardCard.module.scss";

const cx = classNames.bind(styles);

interface DashboardCardProps {
  title: string
  content: string | null
  growthRate: number | null
}

/**
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 * @param {string} title - 카드의 제목입니다.
 * @param {string | null} content - 카드의 내용입니다. `string | null` 타입이 올 수 있습니다.
 * 금액의 경우 금액 포맷 함수로 포맷팅된 금액을 전달해야 합니다. 그 외 `null`의 경우 `-`로 표시됩니다.
 * @param {number | null} growthRate - 변동 칩에 들어갈 수치입니다. `number | null` 타입이 올 수 있습니다.
 *
 * @example
 * ```
 * <DashboardCard title="당월 총 매출액" content={formatMoney(1178932, "card")} growthRate={17} />
 * // 금액이 `null`인 경우 금액 포맷 함수를 거쳐 `- 원`이 대시보드 카드에 전달됩니다.
 * <DashboardCard title="당월 총 매출액" content={formatMoney(null, "card")} growthRate={null} />
 * <DashboardCard title="2023년 8월의 아티스트" content="이름이 매우매우 긴 아티스트" growthRate={0} />
 * ```
 */
const DashboardCard = ({ title, content, growthRate }: DashboardCardProps) => {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>{title}</h2>
      <div className={cx("contentWrapper")}>
        <TooltipRoot message={content ?? "-"}>
          <h3 className={cx("content")}>{content ?? "-"}</h3>
        </TooltipRoot>
        <Chip percentage={growthRate} />
      </div>
    </div>
  );
};

export default DashboardCard;
