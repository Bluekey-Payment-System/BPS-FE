import classNames from "classnames/bind";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import AlbumListSection from "@/components/album/AlbumListSection/AlbumListSection";
import Orbit from "@/components/common/Loading/Orbit";
import useAlbums from "@/services/queries/albums/useAlbumList";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

import styles from "./index.module.scss";

interface ServerSidePageProps {
  memberId: number,
  page: number,
  keyword: string,
}

const cx = classNames.bind(styles);

const ArtistAlbumListPage = (
  query: InferGetServerSidePropsType<GetServerSideProps<ServerSidePageProps>>,
) => {
  const { memberId, page, keyword }: ServerSidePageProps = query;
  const albumsQuery = useAlbums(MEMBER_TYPE.USER, page, keyword, memberId);
  const {
    data: albumsData, isLoading,
  } = albumsQuery;

  if (isLoading) {
    return (
      <div className={cx("loading")}>
        <Orbit dark />
      </div>
    );
  }

  return (
    <AlbumListSection
      albumList={albumsData!.contents}
      userType={MEMBER_TYPE.USER}
      page={page}
      keyword={keyword}
      totalAlbumItems={albumsData!.totalItems}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { artistId, page, keyword = "" } = query;

  return {
    props: {
      memberId: Number(artistId),
      page: convertPageParamToNum(page as string || null),
      keyword,
    },
  };
};

export { getServerSideProps };
export default ArtistAlbumListPage;
