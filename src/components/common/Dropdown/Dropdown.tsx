import { useState, useRef } from "react";

import useOutsideClick from "@/hooks/useOutsideClick";

import DropdownUI from "./DropdownUI";

interface DropdownProps {

  dropdownListData: string[],
  theme?: "bright" | "dark",
  hasSearchBar?: boolean
}

/**
 * @author 임병욱
 * @공통 드롭다운 컴포넌트
 * @흰색 테마:공통 대시보드에서 사용할 드롭다운, 앨범상세 곡별
 * @검은색 테마: 앨범 상세 트랙 별 정산액 추이 차트
 * @dropdownListData 드롭다운을 사용하는 컴포넌트에서 드롭다운 리스트에 넣어줄 데이터입니다. ex)["곡 명", "앨범 명"] 혹은 api 데이터
 * @theme 기본 테마는 흰색입니다 검은 테마를 사용하시려면 "black"을 입력해주세요
 * @hasSearchBar 드롭다운 리스트에 검색창이 필요하다면 이 속성을 true로 설정해주세요
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Dropdown = ({ dropdownListData, theme = "bright", hasSearchBar = false }: DropdownProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const dropdownListWrapperRef = useRef<HTMLDivElement>(null);

  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>(dropdownListData[0]);

  const handleToggle = (event: React.MouseEvent<HTMLImageElement | HTMLButtonElement>) => {
    event.preventDefault();
    setToggle(!toggle);
  };

  const handleCloseList = () => {
    setToggle(false);
  };

  const handleClickDropdownItem = (event: React.MouseEvent<HTMLInputElement>) => {
    setToggle(false);
    setSelectedDropdownValue(event.currentTarget.value);
    // 추후에 api가 추가되면 데이터를 이용하여 쿼리스트링을 변경하는 코드 추가 예정
  };

  useOutsideClick(dropdownListWrapperRef, handleCloseList);

  return (
    <DropdownUI
      ref={dropdownListWrapperRef}
      selectedDropdownValue={selectedDropdownValue}
      toggle={toggle}
      dropdownListData={dropdownListData}
      handleToggle={handleToggle}
      onClickDropdownItem={handleClickDropdownItem}
      theme={theme}
      hasSearchBar={hasSearchBar}
    />
  );
};

export default Dropdown;
