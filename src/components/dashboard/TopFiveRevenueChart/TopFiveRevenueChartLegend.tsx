import classNames from "classnames/bind";

import { chartColor } from "@/components/common/Chart/chart.utils";
import Chip from "@/components/common/Chip/Chip";
import CustomLegend from "@/components/common/CustomLegend/CustomLegend";
import { IDoughnutArtistRevenue, IDoughnutTrackRevenue } from "@/types/dto";
import formatMoney from "@/utils/formatMoney";

import styles from "./TopFiveRevenueChart.module.scss";

const cx = classNames.bind(styles);

interface TopFiveChartLegendProps {
  legendData: IDoughnutArtistRevenue | IDoughnutTrackRevenue;
  index: number;
}

const TopFiveRevenueChartLegend = ({ legendData, index }: TopFiveChartLegendProps) => {
  const isArtist = "artist" in legendData;
  let legendText;
  if (!isArtist) {
    legendText = legendData.track === null ? "기타" : legendData.track.name;
  } else {
    legendText = legendData.artist === null ? "기타" : legendData.artist.name;
  }

  return (
    <div key={index} className={cx("legendItem")}>
      {isArtist || "track" in legendData ? (
        <>
          <CustomLegend
            key={chartColor[index]}
            color={chartColor[index]}
            text={legendText}
            type="doughnut"
          />
          <p className={cx("formattedMoney")}>{formatMoney(legendData.revenue, "chart")}</p>
          <Chip percentage={legendData.growthRate} />
        </>
      ) : null}
    </div>
  );
};

export default TopFiveRevenueChartLegend;
