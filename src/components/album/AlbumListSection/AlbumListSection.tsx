import { useRef, useState } from "react";

import classNames from "classnames/bind";

import MainLayout from "@/components/common/Layouts/MainLayout";
import Pagination from "@/components/common/Pagination/Pagination";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { ITEMS_PER_ALBUM_LIST } from "@/constants/pagination";
import useToast from "@/hooks/useToast";
import { MemberType } from "@/types/enums/user.enum";

import AlbumList from "../AlbumList/AlbumList";

import styles from "./AlbumListSection.module.scss";

interface AlbumListSectionProps {
  userType: MemberType,
  page: number,
  keyword: string,
  totalAlbumItems: number,
}

const cx = classNames.bind(styles);

const AlbumListSection = ({
  userType, page, keyword, totalAlbumItems,
}: AlbumListSectionProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword);
  const searchKeywordRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleSearchAlbumTitle = () => {
    showToast("앨범명 검색!");
  };

  return (
    <MainLayout title="앨범 상세">
      <div className={cx("artboardLayout")}>
        <div className={cx("content")}>
          <div className={cx("searchBarSection")}>
            <SearchBar placeholder="앨범명을 검색해주세요." onClick={handleSearchAlbumTitle} ref={searchKeywordRef} value={searchKeyword} />
          </div>
          <AlbumList
            userType={userType}
            paginationElement={(
              <Pagination
                activePage={page}
                totalItems={totalAlbumItems}
                itemsPerPage={ITEMS_PER_ALBUM_LIST}
              />
          )}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AlbumListSection;
