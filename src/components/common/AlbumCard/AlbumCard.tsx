import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./AlbumCard.module.scss";
import OptionsButton from "./OptionsButton";

const defaultAlbumCover = "/images/default-album-cover.svg";

interface AlbumCardProps {
  albumCoverUrl: string | null,
  albumId: number
  albumTitle: string
  accessAdmin?: boolean
}

const cx = classNames.bind(styles);

const AlbumCard = ({
  albumCoverUrl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  albumId,
  albumTitle,
  accessAdmin = false,
}: AlbumCardProps) => {
  const handleClickAlbumCard = () => {
    /* 임시 */
    // eslint-disable-next-line no-console
    console.log(`"albums/${albumId}"로 이동`);
  };

  return (
    <div role="presentation" className={cx("albumContainer")} onClick={handleClickAlbumCard}>
      <div className={cx("imageBox")}>
        <div className={cx("imageContent")}>
          <Image
            src={albumCoverUrl ?? defaultAlbumCover}
            fill
            alt="앨범 아트"
            className={cx("albumCover", { default: !albumCoverUrl })}
          />
        </div>
      </div>
      <div className={cx("albumContent")}>
        <h3 className={cx("albumTitle")}>{albumTitle}</h3>
        {accessAdmin
          && (
            <OptionsButton albumId={albumId} albumTitle={albumTitle} />
          )}
      </div>
    </div>
  );
};
export default AlbumCard;
