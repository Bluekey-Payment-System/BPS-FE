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
    data: albumsData, isLoading, isError,
  } = albumsQuery;

  if (isLoading) {
    return (
      <div className={cx("loading")}>
        <Orbit dark />
      </div>
    );
  }
  if (isError) return <div>에러 발생</div>;
  if (!albumsData) return <div>데이터 없음</div>;

  return (
    <AlbumListSection albumList={albumsData.contents} userType={MEMBER_TYPE.ADMIN} page={page} keyword={keyword ?? ""} totalAlbumItems={albumsData.totalItems} />
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
