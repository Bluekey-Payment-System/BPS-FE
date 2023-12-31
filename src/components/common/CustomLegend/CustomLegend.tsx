import classNames from "classnames/bind";

import TooltipRoot from "../Tooltip/TooltipRoot";

import styels from "./CustomLegend.module.scss";

const cx = classNames.bind(styels);

interface CustomLegendProps {
  color: string,
  text: string,
  type: "bar" | "doughnut"
}

/**
 * @author 임병욱
 * @param {string} color - 컬러 설정
 * @param {string} text - 아티스트명, 곡명, 매출액, 정산액
 * @param {string} type bar차트, doughnut차트 따라 마진값을 다르게 주기위해 사용합니다
*/
const CustomLegend = ({ color, text, type }: CustomLegendProps) => {
  return (
    <div className={cx("customLegendContainer")}>
      <div className={cx("color")} style={{ backgroundColor: color }} />
      <TooltipRoot message={text}>
        <p className={cx("description", type)}>{text}</p>
      </TooltipRoot>
    </div>
  );
};

export default CustomLegend;
