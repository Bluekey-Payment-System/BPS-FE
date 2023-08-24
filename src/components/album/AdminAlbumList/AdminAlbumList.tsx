import classNames from "classnames/bind";

import AlbumCard from "@/components/common/AlbumCard/AlbumCard";
import { MOCK_ALBUMS } from "@/constants/mock";

import styles from "./AdminAlbumList.module.scss";

const cx = classNames.bind(styles);

const AdminAlbumList = () => {
  const albumList = MOCK_ALBUMS.contents;

  return (
    <div className={cx("container")}>
      {albumList.map((album) => {
        return (
          <AlbumCard
            key={album.albumId}
            albumId={album.albumId}
            albumCoverUrl={album.albumImage}
            albumTitle={album.koAlbumName}
            hasOptionsButton
          />
        );
      })}
    </div>
  );
};

export default AdminAlbumList;
