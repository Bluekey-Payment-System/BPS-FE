import { useState, useRef } from "react";
import { useQuery } from "react-query";

import useOutsideClick from "@/hooks/useOutsideClick";

import DropdownUI from "./DropdownUI";

const Dropdown = ({ url }: { url: string }) => {
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
    // 추후에 쿼리스트링
  };

  useOutsideClick(dropdownListWrapperRef, handleCloseList);

  return (
    <DropdownUI
      ref={dropdownListWrapperRef}
      selectedDropdownValue={selectedDropdownValue}
      toggle={toggle}
      fetchData={["곡 명", "앨범 명"]}
      handleToggle={handleToggle}
      onClickDropdownItem={handleClickDropdownItem}
    />
  );
};

export default Dropdown;
