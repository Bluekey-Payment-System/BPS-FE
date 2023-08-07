import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./DropdownUI.module.scss";

const cx = classNames.bind(styles);

interface DropdownSelectedValueProps {
  selectedDropdownValue: string,
  toggle: boolean,
  handleToggle: React.MouseEventHandler<HTMLImageElement | HTMLDivElement>,
  theme?: "black" | "white"
}

const DropdownSelectedValue = ({
  selectedDropdownValue, toggle, handleToggle, theme,
}: DropdownSelectedValueProps) => {
  return (
    <>
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
    </>
  );
};

export default DropdownSelectedValue;
