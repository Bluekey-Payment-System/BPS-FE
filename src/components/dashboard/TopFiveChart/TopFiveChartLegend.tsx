/* eslint-disable no-nested-ternary */
import classNames from "classnames/bind";

import { chartColor } from "@/components/common/Chart/chart.utils";
import Chip from "@/components/common/Chip/Chip";
import CustomLegend from "@/components/common/CustomLegend/CustomLegend";
import { IDoughnutArtistRevenue, IDoughnutTrackRevenue } from "@/types/dto";
import formatMoney from "@/utils/formatMoney";

import styles from "./TopFiveChart.module.scss";

const cx = classNames.bind(styles);

interface TopFiveChartLegendProps {
  legendData: IDoughnutArtistRevenue | IDoughnutTrackRevenue
  index: number
}

const TopFiveChartLegend = ({ legendData, index }: TopFiveChartLegendProps) => {
  return (
    <div key={index} className={cx("legendItem")}>
      {"artist" in legendData ? (
        <>
          <CustomLegend
            key={chartColor[index]}
            color={chartColor[index]}
            text={legendData.artist.koArtistName}
            type="doughnut"
          />
          <p className={cx("formattedMoney")}>{formatMoney(legendData.revenue, "chart")}</p>
          <Chip percentage={legendData.growthRate} />
        </>
      ) : "track" in legendData ? (
        <>
          <CustomLegend
            key={chartColor[index]}
            color={chartColor[index]}
            text={legendData.track.koTrackName}
            type="doughnut"
          />
          <p className={cx("formattedMoney")}>{formatMoney(legendData.revenue, "chart")}</p>
          <Chip percentage={legendData.growthRate} />
        </>
      ) : null}
    </div>
  );
};

export default TopFiveChartLegend;
