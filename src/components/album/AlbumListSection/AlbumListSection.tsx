/* eslint-disable max-len */
import { useRef, useState } from "react";

import classNames from "classnames/bind";
import { useRouter } from "next/router";

import EmptyData from "@/components/common/EmptyData/EmptyData";
import MainLayout from "@/components/common/Layouts/MainLayout";
import Pagination from "@/components/common/Pagination/Pagination";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { ITEMS_PER_ALBUM_LIST } from "@/constants/pagination";
import { IAlbumCard } from "@/types/dto";
import { MemberType } from "@/types/enums/user.enum";
import updateQueryParam from "@/utils/updateQueryParam";

import AlbumList from "../AlbumList/AlbumList";

import styles from "./AlbumListSection.module.scss";

interface AlbumListSectionProps {
  userType: MemberType,
  page: number,
  keyword: string,
  totalAlbumItems: number,
  albumList: IAlbumCard[],
}

const cx = classNames.bind(styles);

const AlbumListSection = ({
  userType, page, keyword, totalAlbumItems, albumList,
}: AlbumListSectionProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword);
  const searchKeywordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearchAlbumTitle = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (searchKeywordRef.current) {
      setSearchKeyword(searchKeywordRef.current.value);
      const result = updateQueryParam(router.query, "keyword", searchKeywordRef.current.value, "page", 1);

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(result);
    }
  };

  return (
    <MainLayout title="앨범 탐색">
      <div className={cx("artboardLayout")}>
        <div className={cx("content")}>
          <div className={cx("searchBarSection")}>
            <form onSubmit={handleSearchAlbumTitle}>
              <SearchBar placeholder="앨범명을 검색해주세요." onClick={handleSearchAlbumTitle} ref={searchKeywordRef} value={searchKeyword} />
            </form>
          </div>
          {totalAlbumItems === 0
            ? (
              <div className={cx("empty")}>
                <EmptyData
                  type={router.query?.keyword ? "no-search-result" : "no-data"}
                  text={router.query?.keyword ? undefined : "데이터가 없습니다."}
                />
              </div>
            )
            : (
              <AlbumList
                albumList={albumList}
                userType={userType}
                paginationElement={(
                  <Pagination
                    activePage={page}
                    totalItems={totalAlbumItems}
                    itemsPerPage={ITEMS_PER_ALBUM_LIST}
                  />
                )}
              />
            )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AlbumListSection;
