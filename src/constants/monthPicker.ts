import { MonthString, YearString } from "@/components/common/MonthPicker/MonthPicker.type";

const currentDate = new Date();
const CURRENT_YEAR = currentDate.getFullYear();

export const YEAR_OPTIONS = Array.from({ length: 9 }, (_, index) => {
  return (CURRENT_YEAR - 8) + index;
}).map((year) => { return year.toString() as YearString; });

export const MONTH_OPTIONS:MonthString[] = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
];
