import classNames from "classnames/bind";

import styels from "./CustomLegend.module.scss";

const cx = classNames.bind(styels);

interface CustomLegendProps {
  color: string,
  value: string,
  type: "bar" | "donut"
}

/**
 * @author 임병욱
 * @color 컬러 설정
 * @value 아티스트명, 곡명, 매출액, 정산액
 * @type bar차트, donut차트에 따라 마진값을 다르게 주기위해 사용합니다
*/
const CustomLegend = ({ color, value, type }: CustomLegendProps) => {
  return (
    <div className={cx("customLegendContainer")}>
      <div className={cx("color")} style={{ backgroundColor: color }} />
      <p className={cx("description", type === "bar" ? "bar" : "donut")}>{value}</p>
    </div>
  );
};

export default CustomLegend;
