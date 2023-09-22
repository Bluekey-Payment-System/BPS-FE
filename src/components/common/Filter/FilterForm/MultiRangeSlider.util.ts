export const getPercent = (value: number, min: number, max:number) => {
  return Math.round(((value - min) / (max - min)) * 100);
};
