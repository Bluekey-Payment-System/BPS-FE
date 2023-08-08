interface PosType {
  style: { left: number, top: number };
}

const getPosition = (ref: React.RefObject<HTMLElement>, gap = 10): PosType => {
  const rect = ref.current?.getBoundingClientRect() || {
    top: 0, left: 0, width: 0, height: 0,
  };

  return {
    style: {
      left: rect.left + (rect.width / 2), top: rect.top + rect.height + gap,
    },
  };
};

export type { PosType };
export { getPosition };
