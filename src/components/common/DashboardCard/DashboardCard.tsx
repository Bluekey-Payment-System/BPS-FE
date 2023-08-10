import classNames from "classnames/bind";

import Chip from "@/components/common/Chip/Chip";

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
        <h3 className={cx("content")}>{content ?? "-"}</h3>
        <Chip percentage={growthRate} />
      </div>
    </div>
  );
};

export default DashboardCard;
