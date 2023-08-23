import React from "react";

import classNames from "classnames/bind";

import { IHasSearchBarData } from "./Dropdown.type";
import DropdownList from "./DropdownList";
import DropdownSelectedValue from "./DropdownSelectedValue";
import styles from "./DropdownUI.module.scss";

const cx = classNames.bind(styles);

interface DropdownUIProps<T> {
  selectedDropdownValue: T,
  toggle: boolean,
  dropdownListData: T[],
  handleToggle: React.MouseEventHandler<HTMLImageElement | HTMLButtonElement>,
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>,
  theme?: "bright" | "dark" | "withSearchBar",
  hasSearchBar?: boolean,
}
const DropdownUI = <T extends string | IHasSearchBarData>({
  selectedDropdownValue,
  toggle,
  dropdownListData,
  handleToggle,
  onClickDropdownItem,
  theme = "bright",
  hasSearchBar = false,
}: DropdownUIProps<T>, dropdownContainerRef: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={cx("dropdownContainer", theme, { hasSearchBar })} role="presentation" ref={dropdownContainerRef}>
      <DropdownSelectedValue
        selectedDropdownValue={selectedDropdownValue}
        toggle={toggle}
        handleToggle={handleToggle}
        theme={theme}
        hasSearchBar={hasSearchBar}
      />
      {toggle && (
        <div
          className={cx("dropdownListWrapper", theme, { hasSearchBar })}
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
