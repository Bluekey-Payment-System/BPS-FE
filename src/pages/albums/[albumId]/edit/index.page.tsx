import { FormProvider, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import AlbumForm from "@/components/album/AlbumForm/AlbumForm";
import AlbumTrackListTable from "@/components/album/AlbumTrackListTable/AlbumTrackListTable";
import ImageUploader from "@/components/common/ImageUploader/ImageUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import mlStyles from "@/components/common/Layouts/MainLayout.module.scss";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import { MOCK_ALBUM_TRACKS } from "@/constants/mock";
import { IAlbumFieldValues } from "@/types/album.types";

import styles from "./index.module.scss";

const ml = classNames.bind(mlStyles);
const cx = classNames.bind(styles);

const AlbumEditPage = () => {
  const methods = useForm<IAlbumFieldValues>({ mode: "onBlur" });

  return (
    <section className={ml("container")}>
      <h1 className={ml("title")}>앨범 수정</h1>
      <ArtboardLayout>
        <FormProvider {...methods}>
          <div className={cx("container")}>
            <div className={cx("albumInfoContainer")}>
              <SectionLayout title="앨범 아트 업로드">
                <div>
                  <ImageUploader
                    shape="square"
                    onUpload={() => { return Promise.resolve(); }}
                  />
                  <span className={cx("sizeLimitText")}>*이미지 크기는 6MB 이하로 업로드 해주세요.</span>
                </div>
              </SectionLayout>
              <SectionHr />
              <SectionLayout title="앨범 정보 수정">
                <AlbumForm submitBtnText="앨범 수정하기" onSubmit={() => {}} />
              </SectionLayout>
            </div>
            <SectionHr isThick />
            <SectionLayout title="수록곡 목록">
              <AlbumTrackListTable
                albumId={MOCK_ALBUM_TRACKS.albumId}
                tracks={MOCK_ALBUM_TRACKS.tracks}
              />
            </SectionLayout>
          </div>
        </FormProvider>
      </ArtboardLayout>
    </section>
  );
};

export default AlbumEditPage;
