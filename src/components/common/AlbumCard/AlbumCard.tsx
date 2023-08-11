import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./AlbumCard.module.scss";
import EditButton from "./EditButton";

const defaultAlbumCover = "/images/default-album-cover.svg";

interface AlbumCardProps {
  imageUrl: string | null,
  albumId: number
  title: string
  accessAdmin?: boolean
}

const cx = classNames.bind(styles);

const AlbumCard = ({
  imageUrl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  albumId,
  title,
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
            src={imageUrl ?? defaultAlbumCover}
            fill
            alt="앨범 아트"
            className={cx("albumCover", { default: !imageUrl })}
          />
        </div>
      </div>
      <div className={cx("albumContent")}>
        <h3 className={cx("albumTitle")}>{title}</h3>
        {accessAdmin
          && (
            <EditButton />
          )}
      </div>
    </div>
  );
};
export default AlbumCard;
