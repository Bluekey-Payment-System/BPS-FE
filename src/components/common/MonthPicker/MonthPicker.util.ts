import { MonthString, YearString } from "./MonthPicker.type";

export const isYearString = (option: YearString | MonthString): option is YearString => {
  return typeof option === "string" && option.startsWith("20") && option.length === 4;
};

export const getMonthPath = (year: YearString, month: MonthString) => {
  return `${year}${month}`;
};

export const convertToYearMonthFormat = (input: string) => {
  const year = input.slice(0, 4);
  const month = input.slice(4);

  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월",
  ];

  const monthIndex = parseInt(month, 10) - 1;
  const monthName = monthNames[monthIndex];

  return `${year}년 ${monthName}`;
};
