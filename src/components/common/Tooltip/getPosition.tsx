interface PosType {
  style: { left: number, top: number };
}

const getPosition = (ref: React.RefObject<HTMLElement>, gap = 5): PosType => {
  const rect = ref.current?.getBoundingClientRect() || { top: 0, left: 0 };
  // const h = ref.current?.clientHeight as number;
  // const isAbove = rect?.top + h / 2 <= window.innerHeight / 2
  // const top = rect.top + (isAbove ? h + gap : -gap);
  const top = rect.top - gap;

  return {
    style: { left: rect?.left, top },
  };
};

export type { PosType };
export { getPosition };
