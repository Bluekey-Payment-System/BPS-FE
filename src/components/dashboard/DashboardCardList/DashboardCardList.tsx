import classNames from "classnames/bind";

import DashboardCard from "@/components/common/DashboardCard/DashboardCard";
import { DashboardCardProps } from "@/components/common/DashboardCard/DashboardCard.type";

import styles from "./DashboardCardList.module.scss";

const cx = classNames.bind(styles);

const DashboardCardList = ({ data }: { data: DashboardCardProps[] }) => {
  return (
    <section>
      <ul className={cx("container")}>
        {data.map((item) => {
          return (
            <li key={item.title}>
              <DashboardCard
                title={item.title}
                content={item.content}
                growthRate={item.growthRate}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default DashboardCardList;
