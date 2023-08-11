import { useState, useRef } from "react";

import useOutsideClick from "@/hooks/useOutsideClick";

import DropdownUI from "./DropdownUI";

interface DropdownProps {
  dropdownListData: string[],
  hasSearchBar?: boolean,
  theme?: "bright" | "dark" | "withSearchBar" | "hasSearchBar",
}

/**
 * @author 임병욱
 * @공통 드롭다운 컴포넌트
 * @흰색 테마:공통 대시보드에서 사용할 드롭다운, 앨범상세 곡별
 * @검은색 테마: 앨범 상세 트랙 별 정산액 추이 차트
 * @param dropdownListData 드롭다운을 사용하는 컴포넌트에서 드롭다운 리스트에 넣어줄 데이터입니다. ex)["곡 명", "앨범 명"] 혹은 api 데이터
 * @param theme 기본 테마는 흰색입니다 검은 테마를 사용하시려면 "dark", 검색바와 같이 사용할 때는 "withSearchBar"를 사용하시면 됩니다.
 * @param theme "withSearchBar"는 검색창과 같이 사용할 경우, radius가 적용되지않고 드롭다운의 오른쪽 모서리가 직각이 되는 스타일이 적용됩니다.
 * @param theme "hasSearchBar"는 드롭다운 내에 검색창 있는 경우 사용합니다. 이 기능을 사용하실 경우 theme="withSearchBar"와
 * @param theme hasSearchBar = true 속성을 같이 사용해주셔야 스타일링이 적용됩니다.
 * @param hasSearchBar 드롭다운 리스트에 검색창이 필요하다면 이 속성을 true로 설정해주세요.
*/
const Dropdown = ({ dropdownListData, theme = "bright", hasSearchBar = false }: DropdownProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const dropdownListWrapperRef = useRef<HTMLDivElement>(null);

  const initialSelectedDropdownValue = hasSearchBar ? "대표 아티스트를 지정해주세요." : dropdownListData[0];

  // eslint-disable-next-line max-len
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>(initialSelectedDropdownValue);

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
