/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import AlbumListSection from "@/components/album/AlbumListSection/AlbumListSection";
import { useAlbums } from "@/services/queries/albums/useAlbumList";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

interface ServerSidePageProps {
  page: number,
  keyword: string | null,
}

const AdminAlbumListPage = (
  query: InferGetServerSidePropsType<GetServerSideProps<ServerSidePageProps>>,
) => {
  const { page, keyword }: ServerSidePageProps = query;
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword || "");

  // const albumsQuery = useAlbums(MEMBER_TYPE.ADMIN, page, keyword);

  return (
    <AlbumListSection userType={MEMBER_TYPE.ADMIN} searchKeyword={searchKeyword} />
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
