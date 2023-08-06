import { SetStateAction, useRef } from "react";

import Image from "next/image";

import useOutsideClick from "@/hooks/useOutsideClick";

import styles from "./Dropdown.module.scss";
import DropdownList from "./DropdownList";

interface DropdownProps {
  selectedDropdownValue: string,
  setSelectedDropdownValue: React.Dispatch<SetStateAction<string>>,
  toggle: boolean,
  setToggle: React.Dispatch<SetStateAction<boolean>>,
  fetchData: string[]
}

const DropdownUI = ({
  selectedDropdownValue,
  setSelectedDropdownValue,
  toggle,
  setToggle,
  fetchData,
}: DropdownProps) => {
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const dropdownListWrapperRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const handleCloseList = () => {
    setToggle(false);
  };

  const handleClickDropdownItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDropdownValue(event.target.value);
  };

  useOutsideClick(dropdownListWrapperRef, handleCloseList);

  return (
    <div className={styles.dropdownContainer} ref={dropdownContainerRef} onClick={handleToggle} role="presentation">
      <div
        className={styles.userInput}
      >
        {selectedDropdownValue}
      </div>
      <Image
        className={styles.toggle}
        src={toggle ? "/images/dropdown-up.svg" : "/images/dropdown-down.svg"}
        alt="토글버튼"
        width={20}
        height={20}
        onClick={handleToggle}
        id="toggle"
      />
      <div
        ref={dropdownListWrapperRef}
      >
        {toggle && <DropdownList dropdownData={fetchData} onClick={handleClickDropdownItem} />}
      </div>
    </div>
  );
};

export default DropdownUI;
