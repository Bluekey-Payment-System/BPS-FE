import classNames from "classnames/bind";

import MainLayout from "@/components/common/Layouts/MainLayout";

import styles from "./AlbumsListSection.module.scss";

const cx = classNames.bind(styles);

const AlbumListSection = () => {
  return (
    <MainLayout title="앨범 상세">
      <div className={cx("artboardLayout")}>
        <div style={{ width: 850 }}>앨범 상세</div>
      </div>
    </MainLayout>
  );
};

export default AlbumListSection;
