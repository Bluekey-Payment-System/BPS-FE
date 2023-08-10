import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./DropdownUI.module.scss";

const cx = classNames.bind(styles);

interface DropdownSelectedValueProps {
  selectedDropdownValue: string,
  toggle: boolean,
  handleToggle: React.MouseEventHandler<HTMLImageElement | HTMLButtonElement>,
  theme?: "bright" | "dark" | "withSearchBar",
}

const DropdownSelectedValue = ({
  selectedDropdownValue, toggle, handleToggle, theme = "bright",
}: DropdownSelectedValueProps) => {
  return (
    <button onClick={handleToggle} type="button" className={cx("dropdownValueContainer", theme)}>
      <div
        className={cx("userInput")}
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
      />
    </button>
  );
};

export default DropdownSelectedValue;
