import React from "react";

import classNames from "classnames";
import Image from "next/image";

import styles from "./Dropdown.module.scss";
import DropdownList from "./DropdownList";

const cn = classNames.bind(styles);

interface DropdownProps {
  selectedDropdownValue: string,
  toggle: boolean,
  fetchData: string[],
  handleToggle: React.MouseEventHandler<HTMLImageElement | HTMLDivElement>,
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>,
  theme: "black" | "white"
}

const DropdownUI = ({
  selectedDropdownValue,
  toggle,
  fetchData,
  handleToggle,
  onClickDropdownItem,
  theme,
}: DropdownProps, dropdownListWrapperRef: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={styles.dropdownContainer} onClick={handleToggle} role="presentation">
      <div
        className={cn(styles.userInput, theme === "black" && styles.blackTheme)}
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
        className={styles.dropdownWrapper}
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
