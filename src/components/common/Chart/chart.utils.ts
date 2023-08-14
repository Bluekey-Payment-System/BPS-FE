export const chartColor: string[] = [
  "#387ffd", // 파란색
  "#9B88ED", // 보라색
  "#FB67CA", // 핑크색
  "#00C02A", // 녹색
  "#FFA84A", // 주황색
  "#D96704", // 갈색
];

const monthNames: { [key: number]: string } = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const getMonthName = (num: number): string => {
  if (monthNames[num]) {
    return monthNames[num];
  }
  throw new Error("Invalid month number");
};
