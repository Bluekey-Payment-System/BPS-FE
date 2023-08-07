import React from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import DropdownList from "./DropdownList";
import styles from "./DropdownUI.module.scss";

const cx = classNames.bind(styles);

interface DropdownUIProps {
  selectedDropdownValue: string,
  toggle: boolean,
  dropdownListData: string[],
  handleToggle: React.MouseEventHandler<HTMLImageElement | HTMLDivElement>,
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>,
  theme: "black" | "white"
}

const DropdownUI = ({
  selectedDropdownValue,
  toggle,
  dropdownListData,
  handleToggle,
  onClickDropdownItem,
  theme,
}: DropdownUIProps, dropdownListWrapperRef: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={cx("dropdownContainer")} onClick={handleToggle} role="presentation">
      <div
        className={cx("userInput", theme === "black" && "blackTheme")}
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
        className={cx("dropdownWrapper")}
        ref={dropdownListWrapperRef}
      >
        {toggle && (
          <DropdownList
            dropdownListData={dropdownListData}
            onClickDropdownItem={onClickDropdownItem}
          />
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(DropdownUI);
