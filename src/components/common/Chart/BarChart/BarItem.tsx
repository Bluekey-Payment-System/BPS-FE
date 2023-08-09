import {
  createElement, MouseEvent, useCallback, useMemo,
} from "react";

import { BarDatum, BarItemProps } from "@nivo/bar/dist/types/types";
import { useTheme } from "@nivo/core";
import { useTooltip } from "@nivo/tooltip";
import { animated, to } from "@react-spring/web";

export const BarItem = <RawDatum extends BarDatum>({
  bar: { data, ...bar },

  style: {
    borderColor,
    color,
    height,
    labelColor,
    labelOpacity,
    labelX,
    labelY,
    transform,
    width,
  },

  borderRadius,
  borderWidth,

  label,
  shouldRenderLabel,

  isInteractive,
  onClick,
  onMouseEnter,
  onMouseLeave,

  tooltip,

  isFocusable,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}: BarItemProps<RawDatum>) => {
  const theme = useTheme();
  const { showTooltipFromEvent, showTooltipAt, hideTooltip } = useTooltip();

  const renderTooltip = useMemo(
    () => {
      return function () {
        return createElement(tooltip, { ...bar, ...data });
      };
    },
    [tooltip, bar, data],
  );

  const handleClick = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      onClick?.({ color: bar.color, ...data }, event);
    },
    [bar, data, onClick],
  );
  const handleTooltip = useCallback(
    (event: MouseEvent<SVGRectElement>) => { return showTooltipFromEvent(renderTooltip(), event); },
    [showTooltipFromEvent, renderTooltip],
  );
  const handleMouseEnter = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      onMouseEnter?.(data, event);
      showTooltipFromEvent(renderTooltip(), event);
    },
    [data, onMouseEnter, showTooltipFromEvent, renderTooltip],
  );
  const handleMouseLeave = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      onMouseLeave?.(data, event);
      hideTooltip();
    },
    [data, hideTooltip, onMouseLeave],
  );

  const handleFocus = useCallback(() => {
    showTooltipAt(renderTooltip(), [bar.absX + bar.width / 2, bar.absY]);
  }, [showTooltipAt, renderTooltip, bar]);
  const handleBlur = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  return (
    <animated.g transform={transform}>
      <defs>
        <clipPath id={`round-corner-${label}`}>
          <animated.rect
            x="0"
            y="0"
            rx={3}
            ry={3}
            width={to(width, (value) => { return Math.max(value, 0); })}
            height={to(height, (value) => { return Math.max(value + borderRadius, 0); })}
          />
        </clipPath>
      </defs>

      <animated.rect
        clipPath={`url(#round-corner-${label})`}
        width={to(width, (value) => { return Math.max(value, 0); })}
        height={to(height, (value) => { return Math.max(value, 0); })}
        fill={data.fill ?? color}
        strokeWidth={borderWidth}
        stroke={borderColor}
        focusable={isFocusable}
        tabIndex={isFocusable ? 0 : undefined}
        aria-label={ariaLabel ? ariaLabel(data) : undefined}
        aria-labelledby={ariaLabelledBy ? ariaLabelledBy(data) : undefined}
        aria-describedby={ariaDescribedBy ? ariaDescribedBy(data) : undefined}
        onMouseEnter={isInteractive ? handleMouseEnter : undefined}
        onMouseMove={isInteractive ? handleTooltip : undefined}
        onMouseLeave={isInteractive ? handleMouseLeave : undefined}
        onClick={isInteractive ? handleClick : undefined}
        onFocus={isInteractive && isFocusable ? handleFocus : undefined}
        onBlur={isInteractive && isFocusable ? handleBlur : undefined}
      />

      {shouldRenderLabel && (
        <animated.text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="central"
          fillOpacity={labelOpacity}
          style={{
            ...theme.labels.text,
            pointerEvents: "none",
            fill: labelColor,
          }}
        >
          {label}
        </animated.text>
      )}
    </animated.g>
  );
};
