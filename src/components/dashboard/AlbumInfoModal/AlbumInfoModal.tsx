import classNames from "classnames/bind";
import Image from "next/image";

import Button from "@/components/common/CommonBtns/Button/Button";
import Modal from "@/components/common/Modals/Modal";
import { IGetAlbumTracksResponse } from "@/services/api/types/albums";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import styles from "./AlbumInfoModal.module.scss";
import TrackListTable from "./TrackListTable/TrackListTable";

const cx = classNames.bind(styles);

interface AlbumInfoModalProps {
  data: IGetAlbumTracksResponse
  open: boolean;
  onClose: () => void;
}

const AlbumInfoModal = ({
  data,
  open,
  onClose,
}: AlbumInfoModalProps) => {
  return (
    <Modal type={MODAL_TYPE.INFO} open={open} onClose={onClose}>
      <div className={cx("container")}>
        <h2 className={cx("title")}>앨범 정보</h2>
        <div className={cx("contentContainer")}>
          <div className={cx("albumInfoContainer")}>
            <div className={cx("imageWrapper")}>
              <Image
                className={cx({ defaultCover: !data.albumImage })}
                src={data.albumImage ?? "/images/default-album-cover.svg"}
                fill
                alt="앨범 커버"
              />
            </div>
            <h3 className={cx("albumTitle")}>{data.name}</h3>
            <hr className={cx("hr")} />
            <div className={cx("artist")}>
              <span className={cx("name")}>{data.artist?.name}</span>
              <span className={cx("name", "enName")}>{data.artist?.enName}</span>
            </div>
          </div>
          <div className={cx("tableWrapper")}>
            <TrackListTable tracks={data.tracks} />
          </div>
        </div>
        <div className={cx("buttonWrapper")}>
          <Button size="medium" theme="bright" onClick={() => { onClose(); }}>창 닫기</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlbumInfoModal;
