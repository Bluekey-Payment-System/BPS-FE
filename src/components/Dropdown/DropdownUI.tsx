import React from "react";

import Image from "next/image";

import styles from "./Dropdown.module.scss";
import DropdownList from "./DropdownList";

interface DropdownProps {
  selectedDropdownValue: string,
  toggle: boolean,
  fetchData: string[],
  handleToggle: React.MouseEventHandler<HTMLImageElement | HTMLDivElement>,
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>
}

const DropdownUI = ({
  selectedDropdownValue,
  toggle,
  fetchData,
  handleToggle,
  onClickDropdownItem,
}: DropdownProps, dropdownListWrapperRef: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={styles.dropdownContainer} onClick={handleToggle} role="presentation">
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
        {toggle && (
          <DropdownList
            dropdownData={fetchData}
            onClickDropdownItem={onClickDropdownItem}
          />
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(DropdownUI);
