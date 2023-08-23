import { IHasSearchBarData } from "./Dropdown.type";

/**
 * @author 임병욱
 * @param {string | IHasSearchBarData} value - 드롭다운에서 선택된 객체나 문자열을 받습니다.
 * @param {boolean} hasSearchBar - 검색바가 있는 경우 true를 설정해주세요
 * @return {string}  - 선택된 드롭다운 값s을 리턴해줍니다.
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
