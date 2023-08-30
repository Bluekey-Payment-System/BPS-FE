import classNames from "classnames/bind";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import AlbumListSection from "@/components/album/AlbumListSection/AlbumListSection";
import Orbit from "@/components/common/Loading/Orbit";
import useAlbums from "@/services/queries/albums/useAlbumList";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

import styles from "./index.module.scss";

interface ServerSidePageProps {
  page: number,
  keyword: string | null,
}

const cx = classNames.bind(styles);

const AdminAlbumListPage = (
  query: InferGetServerSidePropsType<GetServerSideProps<ServerSidePageProps>>,
) => {
  const { page, keyword }: ServerSidePageProps = query;
  const albumsQuery = useAlbums(MEMBER_TYPE.ADMIN, page, keyword);
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
    <AlbumListSection albumList={albumsData!.contents} userType={MEMBER_TYPE.ADMIN} page={page} keyword={keyword ?? ""} totalAlbumItems={albumsData!.totalItems} />
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { page, keyword } = query;

  return {
    props: {
      page: convertPageParamToNum(page as string || null),
      keyword: keyword || null,
    },
  };
};

export { getServerSideProps };
export default AdminAlbumListPage;
