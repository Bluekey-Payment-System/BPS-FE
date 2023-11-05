/* eslint-disable max-len */
import { useState, useRef, useEffect } from "react";

import { IHasSearchBarData } from "./Dropdown.type";
import DropdownUI from "./DropdownUI";

interface DropdownProps<T> {
  dropdownListData: T[];
  theme?: "bright" | "dark" | "withSearchBar";
  hasSearchBar?: boolean;
  onClick: (value: T) => void;
  initialValue?: T
  isReset: boolean;
}
/**
 * @author 임병욱
 * @공통 드롭다운 컴포넌트
 * @흰색 테마:공통 대시보드에서 사용할 드롭다운, 앨범상세 곡별
 * @검은색 테마: 앨범 상세 트랙 별 정산액 추이 차트
 * @param dropdownListData 드롭다운을 사용하는 컴포넌트에서 드롭다운 리스트에 넣어줄 데이터입니다. ex)["곡 명", "앨범 명"] 혹은 api 데이터
 * @param theme 기본 테마는 흰색입니다 검은 테마를 사용하시려면 "dark", 검색바와 같이 사용할 때는 "withSearchBar"를 사용하시면 됩니다.
 * @param theme "withSearchBar"는 검색창과 같이 사용할 경우, radius가 적용되지않고 드롭다운의 오른쪽 모서리가 직각이 되는 스타일이 적용됩니다.
 * @param hasSearchBar 드롭다운 리스트에 검색창이 필요하다면 이 속성을 true로 설정해주세요.
 * @param onClick 드롭다운에 클릭된 값을 알기위해 event.currentTarget.value를 받는 함수를 넣어주면 됩니다.
 * @param initialValue 드롭다운에 들어갈 초기값입니다. 값을 설정하지 않으면 dropdownListData[0]이 설정됩니다.
 * @param isReset 드롭다운 값의 초기화 여부를 선택하는 옵션입니다. 기본 값은 false입니다.
*/
const Dropdown = <T extends string | IHasSearchBarData>({
  dropdownListData, theme = "bright", hasSearchBar = false, onClick, initialValue, isReset = false,
}: DropdownProps<T>) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const initialSelectedDropdownValue = initialValue ?? (hasSearchBar ? "대표 아티스트를 지정해주세요." : dropdownListData[0]);

  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string | IHasSearchBarData>(initialSelectedDropdownValue);
  const handleToggle = (event: React.MouseEvent<HTMLImageElement | HTMLButtonElement>) => {
    event.preventDefault();
    setToggle(!toggle);
  };

  const handleCloseList = () => {
    setToggle(false);
  };

  const handleClickDropdownItem = (event: React.MouseEvent<HTMLInputElement>) => {
    setToggle(false);

    if (hasSearchBar) {
      const selectedDropdownItemWithhasSearchBar: IHasSearchBarData | undefined = (dropdownListData as IHasSearchBarData[]).find(
        (dropdownData: IHasSearchBarData) => {
          return dropdownData.name === event.currentTarget.value;
        },
      );

      if (selectedDropdownItemWithhasSearchBar) {
        setSelectedDropdownValue(selectedDropdownItemWithhasSearchBar);
        onClick(selectedDropdownItemWithhasSearchBar as T);
      }
    } else {
      setSelectedDropdownValue(event.currentTarget.value);
      if (typeof event.currentTarget.value === "string") {
        onClick(event.currentTarget.value as T);
      }
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target as Node)) {
      handleCloseList();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  useEffect(() => {
    setSelectedDropdownValue(initialSelectedDropdownValue);
  }, [initialSelectedDropdownValue]);

  useEffect(() => {
    if (isReset) {
      setSelectedDropdownValue(hasSearchBar ? "대표 아티스트를 지정해주세요." : dropdownListData[0]);
    }
  }, [dropdownListData, hasSearchBar, isReset]);

  return (
    <DropdownUI
      ref={dropdownContainerRef}
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
