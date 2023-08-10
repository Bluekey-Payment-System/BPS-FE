interface PosType {
  style: { x: number, y: number };
}

const utilGetPosition = (ref: React.RefObject<HTMLElement>, gap = 10): PosType => {
  const rect = ref.current?.getBoundingClientRect() || {
    top: 0, left: 0, width: 0, height: 0,
  };

  return {
    style: {
      x: rect.left + (rect.width / 2), y: rect.top + rect.height + gap,
    },
  };
};

const utilCheckTextOverflow = (elem: Element): boolean => {
  if (elem.clientWidth < elem.scrollWidth) {
    return true;
  }
  return false;
};

export type { PosType };
export { utilGetPosition, utilCheckTextOverflow };
