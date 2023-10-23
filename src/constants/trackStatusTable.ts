interface Options {
  [key: string]: string;
}

export const SEARCH_BY_OPTIONS_MAP: Options = {
  trackName: "곡 명",
  albumName: "앨범 명",
};

export const REVERSE_SEARCH_BY_OPTIONS_MAP: Options = Object.fromEntries(
  Object.entries(SEARCH_BY_OPTIONS_MAP).map(([key, value]) => { return [value, key]; }),
);

export const SORT_BY_OPTIONS_MAP: Options = {
  revenue: "매출순",
  netIncome: "회사 이익순",
  settlement: "정산액순",
  commissionRate: "요율순",
};

export const REVERSE_SORT_BY_OPTIONS_MAP: Options = Object.fromEntries(
  Object.entries(SORT_BY_OPTIONS_MAP).map(([key, value]) => { return [value, key]; }),
);
