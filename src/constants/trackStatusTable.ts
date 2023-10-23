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
