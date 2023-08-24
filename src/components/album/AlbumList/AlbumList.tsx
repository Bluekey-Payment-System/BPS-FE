import classNames from "classnames/bind";

import AlbumCard from "@/components/common/AlbumCard/AlbumCard";
import { MOCK_ALBUMS } from "@/constants/mock";

import styles from "./AlbumList.module.scss";

interface AlbumListProps {
  userType: "ADMIN" | "ARTIST",
  paginationElement: React.ReactNode
}

const cx = classNames.bind(styles);

const AlbumList = ({ userType, paginationElement }: AlbumListProps) => {
  const albumList = MOCK_ALBUMS.contents;

  return (
    <div className={cx("container")}>
      <div className={cx("albums")}>
        {userType === "ADMIN"
          ? albumList.map((album) => {
            return (
              <AlbumCard
                key={album.albumId}
                albumId={album.albumId}
                albumCoverUrl={album.albumImage}
                albumTitle={album.koAlbumName}
                hasOptionsButton
              />
            );
          })
          : albumList.map((album) => {
            return (
              <AlbumCard
                key={album.albumId}
                albumId={album.albumId}
                albumCoverUrl={album.albumImage}
                albumTitle={album.koAlbumName}
              />
            );
          })}
      </div>
      {paginationElement}
    </div>
  );
};

export default AlbumList;
