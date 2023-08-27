import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import AlbumListSection from "@/components/album/AlbumListSection/AlbumListSection";
import { useAlbums } from "@/services/queries/albums/useAlbumList";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

interface ServerSidePageProps {
  memberId: number,
  page: number,
  keyword: string | null,
}

const ArtistAlbumListPage = (
  query: InferGetServerSidePropsType<GetServerSideProps<ServerSidePageProps>>,
) => {
  const { memberId, page, keyword }: ServerSidePageProps = query;
  const albumsQuery = useAlbums(MEMBER_TYPE.USER, page, keyword, memberId);
  const {
    data: albumsData, isLoading, isError, isFetching,
  } = albumsQuery;

  if (isLoading || isFetching) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;
  if (!albumsData) return <div>데이터 없음</div>;

  return (
    <AlbumListSection userType={MEMBER_TYPE.USER} page={page} keyword={keyword ?? ""} totalAlbumItems={albumsData.totalItems} />
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { artistId, page, keyword } = query;

  return {
    props: {
      memberId: Number(artistId),
      page: convertPageParamToNum(page as string || null),
      keyword: keyword || null,
    },
  };
};

export { getServerSideProps };
export default ArtistAlbumListPage;
