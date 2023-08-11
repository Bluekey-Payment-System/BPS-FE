import { useState } from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import Popover from "../Popover/Popover";

import styles from "./OptionsButton.module.scss";

const cx = classNames.bind(styles);

const OptionsButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOptionsButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={cx("kebabButton")}>
      <button type="button" onClick={handleClickOptionsButton}>
        <Image src="/images/kebab.svg" width={16} height={16} alt="더보기" />
      </button>
      {isOpen
          && (
          <Popover
            top="27px"
            right="-4px"
            onClose={() => { setIsOpen(false); }}
          >
            <ul className={cx("buttonList")}>
              <li className={cx("buttonListItem")}>
                <button className={cx("button")} type="button">수정하기</button>
              </li>
              <li className={cx("buttonListItem")}>
                <button className={cx("button")} type="button">삭제하기</button>
              </li>
            </ul>
          </Popover>
          )}
    </div>
  );
};

export default OptionsButton;
