import classNames from "classnames/bind";
import Image from "next/image";

import { IHasSearchBarData } from "./Dropdown.type";
import setDropdownItemValue from "./Dropdown.utils";
import styles from "./DropdownUI.module.scss";

const cx = classNames.bind(styles);

interface DropdownSelectedValueProps {
  selectedDropdownValue: string | IHasSearchBarData,
  toggle: boolean,
  handleToggle: React.MouseEventHandler<HTMLImageElement | HTMLButtonElement>,
  theme?: "bright" | "dark" | "withSearchBar",
  hasSearchBar?: boolean
}

const DropdownSelectedValue = ({
  selectedDropdownValue, toggle, handleToggle, theme = "bright", hasSearchBar = false,
}: DropdownSelectedValueProps) => {
  const formattedValue = setDropdownItemValue(selectedDropdownValue, hasSearchBar);
  return (
    <button onClick={handleToggle} type="button" className={cx("dropdownValueContainer", theme, { hasSearchBar })}>
      <div
        className={cx("selectedValue", theme, { hasSearchBar })}
      >
        {formattedValue}
      </div>
      <Image
        className={cx("toggle", theme)}
        src={toggle ? "/images/dropdown-up.svg" : "/images/dropdown-down.svg"}
        alt="토글버튼"
        width={20}
        height={20}
        onClick={handleToggle}
      />
    </button>
  );
};

export default DropdownSelectedValue;
