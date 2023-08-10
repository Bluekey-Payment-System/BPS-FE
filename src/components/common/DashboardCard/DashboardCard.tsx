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

const DashboardCard = ({
  title, content, growthRate = 0,
}: DashboardCardProps) => {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>{title}</h2>
      <div className={cx("contentWrapper")}>
        <TooltipRoot message={content ?? "-"}>
          <h3 className={cx("content")} id="content">{content ?? "-"}</h3>
        </TooltipRoot>
        <Chip percentage={growthRate} />
      </div>
    </div>
  );
};

export default DashboardCard;
