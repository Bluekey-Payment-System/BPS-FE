import { useState } from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import Popover from "../Popover/Popover";

import styles from "./EditButton.module.scss";

const cx = classNames.bind(styles);

const EditButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    // <div style={{ position: "relative" }}>
    //   <button type="button" onClick={handleClickEditButton}>
    //     <Image src="/images/kebab.svg" width={16} height={16} alt="더보기" />
    //   </button>
    //   {isOpen
    //       && (
    //       <Popover
    //         top="10px" // popoverParent기준으로 해당 팝오버는 10px 아래에서 나타남
    //         onClose={() => { setIsOpen(false); }}
    //       >
    //         <div style={{ backgroundColor: "red" }}>팝오버 내용</div>
    //       </Popover>
    //       )}
    // </div>
    <ul className={cx("buttonList")}>
      <li className={cx("buttonListItem")}>
        <button className={cx("button")} type="button">수정하기</button>
      </li>
      <li className={cx("buttonListItem")}>
        <button className={cx("button")} type="button">삭제하기</button>
      </li>
    </ul>
  );
};

export default EditButton;
