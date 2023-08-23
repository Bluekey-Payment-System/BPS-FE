import { IHasSearchBarData } from "./Dropdown.type";

/**
 * @author 임병욱
 * @param {string | IHasSearchBarData} value -
 * @param {boolean} hasSearchBar - 선택된 드롭다운을 리턴해줍니다.
 * @return {string}  - 선택된 드롭다운을 리턴해줍니다.
 */
const setDropdownItemValue = (value: string | IHasSearchBarData, hasSearchBar: boolean) => {
  let selectedValue: string = "";

  if (hasSearchBar) {
    if (typeof value === "string") {
      selectedValue = "대표 아티스트를 설정해주세요";
    } else {
      selectedValue = Object.values(value)[1] as string;
    }
  } else if (typeof value === "string") {
    selectedValue = value;
  }
  return selectedValue;
};

export default setDropdownItemValue;
