import React, {
  ChangeEvent, useEffect, useState, useRef,
} from "react";

import classNames from "classnames/bind";

import styles from "./MultiRangeSlider.module.scss";
import { ISliderRefsObj } from "./MultiRangeSlider.type";
import { getPercent } from "./MultiRangeSlider.util";

const cx = classNames.bind(styles);

interface MultiRangeSliderProps {
  min: number;
  max: number;
  initialMinValue?: number;
  initialMaxValue?: number;
}

const MultiRangeSlider = (
  {
    min, max, initialMinValue, initialMaxValue,
  }: MultiRangeSliderProps,
  ref: React.ForwardedRef<ISliderRefsObj>,
) => {
  const [minVal, setMinVal] = useState(initialMinValue || min);
  const [maxVal, setMaxVal] = useState(initialMaxValue || max);
  const { current } = ref as React.MutableRefObject<ISliderRefsObj>;
  const range = useRef<HTMLDivElement>(null);
  const leftValRef = useRef<HTMLDivElement>(null);
  const rightValRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const minPercent = getPercent(minVal, min, max);
    const maxPercent = getPercent(maxVal, min, max);
    const distance = maxPercent - minPercent;

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }

    if (leftValRef.current) {
      leftValRef.current.style.left = `${minPercent}%`;
    }

    if (rightValRef.current) {
      rightValRef.current.style.left = `${maxPercent}%`;
      rightValRef.current.style.marginTop = distance < 10 ? "-20px" : "20px";
    }
  }, [minVal, maxVal, min, max]);

  return (
    <div className={cx("container")}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(Number(e.target.value), maxVal - 1);
          setMinVal(value);
        }}
        className={cx("thumb", "left")}
        style={{ zIndex: minVal > max - 100 ? "5" : "3" }}
        ref={(el) => {
          current.comFrRef = el;
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(Number(e.target.value), minVal + 1);
          setMaxVal(value);
        }}
        className={cx("thumb", "right")}
        ref={(el) => {
          current.comToRef = el;
        }}
      />
      <div className={cx("slider")}>
        <div className={cx("track")} />
        <div ref={range} className={cx("range")} />
        <div ref={leftValRef} className={cx("leftVal")}>{`${minVal}%`}</div>
        <div ref={rightValRef} className={cx("rightVal")}>{`${maxVal}%`}</div>
      </div>
    </div>
  );
};

export default React.forwardRef<ISliderRefsObj, MultiRangeSliderProps>(MultiRangeSlider);
