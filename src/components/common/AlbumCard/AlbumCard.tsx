import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./AlbumCard.module.scss";

interface AlbumCardProps {
  imageUrl?: string,
  albumId: number
  title: string
  accessAdmin?: boolean
}
const cx = classNames.bind(styles);
const AlbumCard = ({
  imageUrl = "/images/default-album-cover.svg",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  albumId,
  title,
  accessAdmin = false,
}: AlbumCardProps) => {
  return (
    <div className={cx("albumContainer")}>
      <div className={cx("imageBox")}>
        <div className={cx("imageContent")}>
          {/* <Image
            src={imageUrl}
            width={65}
            height={110}
            alt="앨범 아트"
          /> */}
          <Image
            src={imageUrl}
            fill
            alt="앨범 아트"
            className={cx("albumCover")}
          />
        </div>
      </div>
      <div className={cx("albumContent")}>
        <h3 className={cx("albumTitle")}>{title}</h3>
        {accessAdmin
          && (
            <button type="button">
              <Image src="/images/kebab.svg" width={16} height={16} alt="더보기" />
            </button>
          )}
      </div>
    </div>
  );
};
export default AlbumCard;
