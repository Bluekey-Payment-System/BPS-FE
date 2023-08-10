import React from "react";

import classNames from "classnames/bind";

import DropdownList from "./DropdownList";
import DropdownSelectedValue from "./DropdownSelectedValue";
import styles from "./DropdownUI.module.scss";

const cx = classNames.bind(styles);

interface DropdownUIProps {
  selectedDropdownValue: string,
  toggle: boolean,
  dropdownListData: string[],
  handleToggle: React.MouseEventHandler<HTMLImageElement | HTMLButtonElement>,
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>,
  theme?: "bright" | "dark" | "withSearchBar",
  hasSearchBar: boolean,
}

const DropdownUI = ({
  selectedDropdownValue,
  toggle,
  dropdownListData,
  handleToggle,
  onClickDropdownItem,
  theme = "bright",
  hasSearchBar,
}: DropdownUIProps, dropdownListWrapperRef: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={cx("dropdownContainer")} role="presentation">
      <DropdownSelectedValue
        selectedDropdownValue={selectedDropdownValue}
        toggle={toggle}
        handleToggle={handleToggle}
        theme={theme}
      />
      {toggle && (
        <div
          className={cx("dropdownWrapper", theme)}
          ref={dropdownListWrapperRef}
        >
          <DropdownList
            dropdownListData={dropdownListData}
            onClickDropdownItem={onClickDropdownItem}
            hasSearchBar={hasSearchBar}
          />
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(DropdownUI);
