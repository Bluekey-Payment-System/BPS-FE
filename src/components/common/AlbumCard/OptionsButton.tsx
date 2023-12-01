import { MouseEventHandler, useState } from "react";

import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";

import Popover from "@/components/common/Popover/Popover";
import useDeleteAlbum from "@/services/queries/albums/useDeleteAlbum";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import AlertModal from "../Modals/AlertModal/AlertModal";

import styles from "./OptionsButton.module.scss";

interface OptionsButtonProps {
  albumId: number,
  albumTitle: string,
}

const cx = classNames.bind(styles);

const OptionsButton = ({ albumId, albumTitle }: OptionsButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: deleteAlbum } = useDeleteAlbum();

  const router = useRouter();

  const handleClickOptionsButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setIsOpen(!isOpen);
  };

  const handleClickEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(`/admin/albums/${albumId}/edit`);
  };

  const handleClickDeleteButton:MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setIsDeleteModalOpen(true);
    setIsOpen(false);
  };

  const handleDeleteAlbum: MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteAlbum(albumId);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={cx("kebabContent")}>
      <button type="button" onClick={handleClickOptionsButton} className={cx("kebabButton")}>
        <Image src="/images/kebab.svg" width={16} height={16} alt="더보기" className={cx("kebabIcon")} />
      </button>
      {isOpen
          && (
          <Popover
            top="27px"
            right="-4px"
            onClose={() => {
              setIsOpen(false);
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
      <AlertModal
        open={isDeleteModalOpen}
        type={MODAL_TYPE.CONFIRM}
        title="앨범 삭제"
        message={`[${albumTitle}] 앨범을 삭제 하시겠습니까?`}
        onClose={() => { setIsDeleteModalOpen(false); }}
        onClickProceed={handleDeleteAlbum}
        proceedBtnText="네, 삭제할게요"
        closeBtnText="취소"
      />
    </div>
  );
};

export default OptionsButton;
