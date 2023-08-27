import classNames from "classnames/bind";

import MainLayout from "@/components/common/Layouts/MainLayout";
import Pagination from "@/components/common/Pagination/Pagination";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import useToast from "@/hooks/useToast";
import { MemberType } from "@/types/enums/user.enum";

import AlbumList from "../AlbumList/AlbumList";

import styles from "./AlbumListSection.module.scss";

interface AlbumListSectionProps {
  userType: MemberType,
  searchKeyword: string,

}

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AlbumListSection = ({ userType, searchKeyword }: AlbumListSectionProps) => {
  const { showToast } = useToast();

  const handleSearchAlbumTitle = () => {
    showToast("앨범명 검색!");
  };

  return (
    <MainLayout title="앨범 상세">
      <div className={cx("artboardLayout")}>
        <div className={cx("content")}>
          <div className={cx("searchBarSection")}>
            <SearchBar placeholder="앨범명을 검색해주세요." onClick={handleSearchAlbumTitle} value="" />
          </div>
          <AlbumList
            userType={userType}
            paginationElement={(
              <Pagination
                activePage={1}
                totalItems={150}
                itemsPerPage={6}
              />
          )}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AlbumListSection;
