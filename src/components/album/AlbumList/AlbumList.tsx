import classNames from "classnames/bind";

import AlbumCard from "@/components/common/AlbumCard/AlbumCard";
import { IAlbumCard } from "@/types/dto";
import { MEMBER_TYPE, MemberType } from "@/types/enums/user.enum";

import styles from "./AlbumList.module.scss";

interface AlbumListProps {
  userType: MemberType,
  paginationElement: React.ReactNode,
  albumList: IAlbumCard[];
}

const cx = classNames.bind(styles);

const AlbumList = ({ userType, paginationElement, albumList }: AlbumListProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("albums")}>
        {albumList.map((album) => {
          return (
            <AlbumCard
              key={album.albumId}
              albumId={album.albumId}
              albumCoverUrl={album.albumImage ?? "/images/default-album-cover-small.png"}
              hasOptionsButton={userType === MEMBER_TYPE.ADMIN}
              albumTitle={album.name}
            />
          );
        })}
      </div>
      {paginationElement}
    </div>
  );
};

export default AlbumList;
