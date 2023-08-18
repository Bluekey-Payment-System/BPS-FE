import classNames from "classnames/bind";

import DashboardCard from "@/components/common/DashboardCard/DashboardCard";
import { DashboardCardProps } from "@/components/common/DashboardCard/DashboardCard.type";

import styles from "./DashboardCardList.module.scss";

const cx = classNames.bind(styles);

const DashboardCardList = ({ data }: { data: DashboardCardProps[] }) => {
  return (
    <section className={cx("container")}>
      {data.map((item) => {
        return (
          <DashboardCard
            title={item.title}
            content={item.content}
            growthRate={item.growthRate}
            key={item.title}
          />
        );
      })}
    </section>
  );
};

export default DashboardCardList;
