type Fluctuation = "increase" | "decrease" | "zero";

const getFluctuation = (percentage: number | null): Fluctuation => {
  if (percentage === null || percentage === 0) {
    return "zero";
  } if (percentage > 0) {
    return "increase";
  }
  return "decrease";
};

export type { Fluctuation };
export { getFluctuation };
