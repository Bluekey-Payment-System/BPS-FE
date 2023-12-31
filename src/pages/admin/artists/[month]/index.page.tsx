import { ParsedUrlQuery } from "querystring";

import { useRef, useState } from "react";

import classNames from "classnames/bind";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import ArtistsMainLayout from "@/components/artist/ArtistsMainLayout/ArtistsMainLayout";
import ArtistsStatusTable from "@/components/artist/ArtistsStatusTable/ArtistsStatusTable";
import EmptyArtistTableData from "@/components/artist/ArtistsStatusTable/EmptyArtistTableData";
import Orbit from "@/components/common/Loading/Orbit";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { ITEMS_PER_ARTISTS_TABLE } from "@/constants/pagination";
import { useArtistsStatus } from "@/services/queries/artists/useArtistsStatus";
import convertPageParamToNum from "@/utils/convertPageParamToNum";
import updateQueryParam from "@/utils/updateQueryParam";

import styles from "./index.module.scss";

interface ArtistsStatusPageProps {
  month: string,
  page: number,
  keyword: string,
}

const cx = classNames.bind(styles);
const ArtistsStatusPage = (
  query: InferGetServerSidePropsType<GetServerSideProps<ArtistsStatusPageProps>>,
) => {
  const { month, page, keyword }: ArtistsStatusPageProps = query;
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword || "");
  const {
    data: artistsStatus, isLoading,
  } = useArtistsStatus(
    month,
    page,
    keyword,
  );
  const searchKeywordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className={cx("loading")}>
        <Orbit dark />
      </div>
    );
  }

  // eslint-disable-next-line max-len
  const handleSearchKeyword = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (searchKeywordRef.current) {
      setSearchKeyword(searchKeywordRef.current.value);
      const result = updateQueryParam(router.query, "keyword", searchKeywordRef.current.value, "page", 1);

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(result);
    }
  };

  return (
    <ArtistsMainLayout
      title="아티스트 현황"
      dropdownElement={
        <MonthPickerDropdown />
      }
      searchBarElement={(
        <form onSubmit={handleSearchKeyword}>
          <SearchBar
            placeholder="검색어를 입력해주세요."
            onClick={handleSearchKeyword}
            ref={searchKeywordRef}
            value={searchKeyword}
          />
        </form>
      )}
    >
      {artistsStatus!.totalItems === 0
        ? <EmptyArtistTableData isEmptySearch={!!router.query.keyword} />
        : (
          <ArtistsStatusTable
            artistList={artistsStatus!.contents}
            month={month}
            paginationElement={(
              <Pagination
                activePage={page}
                totalItems={artistsStatus!.totalItems}
                itemsPerPage={ITEMS_PER_ARTISTS_TABLE}
              />
            )}
          />
        )}
    </ArtistsMainLayout>

  );
};

interface ArtistsStatusPageQuery extends ParsedUrlQuery {
  month: string,
  page?: string,
  keyword?: string,
}

// eslint-disable-next-line @typescript-eslint/require-await
const getServerSideProps: GetServerSideProps<ArtistsStatusPageProps> = async ({ query }) => {
  const { month, page, keyword = "" } = query as ArtistsStatusPageQuery;

  return {
    props: {
      month,
      page: convertPageParamToNum(page || null),
      keyword,
    },
  };
};

export { getServerSideProps };
export default ArtistsStatusPage;
