import classNames from "classnames/bind";
import Image from "next/image";

import Button from "@/components/common/CommonBtns/Button/Button";
import Modal from "@/components/common/Modals/Modal";
import { MOCK_ALBUM_TRACKS } from "@/constants/mock";

import styles from "./AlbumInfoModal.module.scss";
import TrackListTable from "./TrackListTable/TrackListTable";

const cx = classNames.bind(styles);

interface AlbumInfoModalProps {
  open: boolean;
  onClose: () => void;
}

const AlbumInfoModal = ({
  open,
  onClose,
}: AlbumInfoModalProps) => {
  return (
    <Modal type="ALBUM_INFO" open={open} onClose={onClose}>
      <div className={cx("container")}>
        <h2 className={cx("title")}>앨범 정보</h2>
        <div className={cx("contentContainer")}>
          <div className={cx("albumInfoContainer")}>
            <Image src="/images/filter.svg" width={346} height={341} alt="앨범 커버" />
            <div className={cx("textContainer")}>
              <h3 className={cx("albumTitle")}>Beautiful</h3>
              <div className={cx("artist")}>
                <span className={cx("name")}>혁기</span>
                <span className={cx("name", "enName")}>Hyucki</span>
              </div>
            </div>
          </div>
          <div className={cx("tableWrapper")}>
            <TrackListTable tracks={MOCK_ALBUM_TRACKS.tracks} />
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
