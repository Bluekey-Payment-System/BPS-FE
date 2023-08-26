export const formatCommissionRate = (prevValue: number | null) => {
  return (typeof prevValue === "number") ? `${prevValue}%` : "-";
};
