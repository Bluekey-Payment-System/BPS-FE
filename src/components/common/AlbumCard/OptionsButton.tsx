import { useState } from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import Popover from "@/components/common/Popover/Popover";

import styles from "./OptionsButton.module.scss";

interface OptionsButtonProps {
  albumId: number,
  albumTitle: string
}

const cx = classNames.bind(styles);

const OptionsButton = ({ albumId, albumTitle }: OptionsButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOptionsButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setIsOpen(!isOpen);
  };

  const handleClickEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    /* 임시 */
    // eslint-disable-next-line no-console
    console.log(`"/admin/albums/edit/${albumId}"로 이동`);
  };

  const handleClickDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    /* 임시 */
    // eslint-disable-next-line no-console
    console.log(`"${albumTitle}" 앨범을 삭제하시겠습니까? 모달 띄우기`);
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
            onClose={() => {
              setTimeout(() => { return setIsOpen(false); }, 10);
            }}
          >
            <ul className={cx("buttonList")}>
              <li className={cx("buttonListItem")}>
                <button className={cx("button")} type="button" onClick={handleClickEditButton}>수정하기</button>
              </li>
              <li className={cx("buttonListItem")}>
                <button className={cx("button")} type="button" onClick={handleClickDeleteButton}>삭제하기</button>
              </li>
            </ul>
          </Popover>
          )}
    </div>
  );
};

export default OptionsButton;
