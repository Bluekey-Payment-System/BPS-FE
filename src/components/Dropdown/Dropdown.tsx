import { useState, useRef } from "react";
import { useQuery } from "react-query";

import useOutsideClick from "@/hooks/useOutsideClick";

import DropdownUI from "./DropdownUI";

interface DropdownProps {
  url: string,
  theme: "black" | "white",
}

const Dropdown = ({ url, theme = "white" }: DropdownProps) => {
  // const { date, isloading }: { date: string[], isLoading: boolean } = useQuery(url, fetchData);
  const [toggle, setToggle] = useState<boolean>(false);
  const dropdownListWrapperRef = useRef<HTMLDivElement>(null);

  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>("곡 명");

  const handleToggle = (e: React.MouseEvent<HTMLImageElement | HTMLDivElement>) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const handleCloseList = () => {
    setToggle(false);
  };

  const handleClickDropdownItem = (event: React.MouseEvent<HTMLInputElement>) => {
    setSelectedDropdownValue(event.currentTarget.value);
    // 추후에 api가 추가되면 데이터를 이용하여 쿼리스트링을 변경하는 코드 추가 예정
  };

  useOutsideClick(dropdownListWrapperRef, handleCloseList);

  return (
    <DropdownUI
      ref={dropdownListWrapperRef}
      selectedDropdownValue={selectedDropdownValue}
      toggle={toggle}
      fetchData={["곡 명", "앨범 명", "동해물과 백두산이 마르고 닮도록 하나님이"]}
      handleToggle={handleToggle}
      onClickDropdownItem={handleClickDropdownItem}
      theme={theme}
    />
  );
};

export default Dropdown;
