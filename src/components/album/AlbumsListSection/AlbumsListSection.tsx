import classNames from "classnames/bind";

import MainLayout from "@/components/common/Layouts/MainLayout";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import useToast from "@/hooks/useToast";

import styles from "./AlbumsListSection.module.scss";

const cx = classNames.bind(styles);

const AlbumListSection = () => {
  const { showToast } = useToast();

  const handleSearchAlbumTitle = () => {
    showToast("앨범명 검색!");
  };

  return (
    <MainLayout title="앨범 상세">
      <div className={cx("artboardLayout")}>
        <div style={{ width: 850 }}>
          <div className={cx("searchBarSection")}>
            <SearchBar placeholder="앨범명을 검색해주세요." onClick={handleSearchAlbumTitle} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AlbumListSection;
