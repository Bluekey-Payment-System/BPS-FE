import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";
import { useRouter } from "next/router";

import AlbumForm from "@/components/album/AlbumForm/AlbumForm";
import AlbumTrackListTable from "@/components/album/AlbumTrackListTable/AlbumTrackListTable";
import ImageUploader from "@/components/common/ImageUploader/ImageUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import mlStyles from "@/components/common/Layouts/MainLayout.module.scss";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import Orbit from "@/components/common/Loading/Orbit";
import useAlbumInfo from "@/services/queries/albums/useAlbumInfo";
import useUpdateAlbumInfo from "@/services/queries/albums/useUpdateAlbumInfo";
import { IAlbumFieldValues } from "@/types/album.types";

import styles from "./index.module.scss";

const ml = classNames.bind(mlStyles);
const cx = classNames.bind(styles);

const AlbumEditPage = () => {
  const router = useRouter();
  const albumId = parseInt(router.query.albumId as string, 10);
  const { data, isLoading: isAlbumInfoLoading } = useAlbumInfo(albumId);
  const { mutate, isLoading: isUpdateLoading } = useUpdateAlbumInfo();
  const methods = useForm<IAlbumFieldValues>({
    mode: "onBlur",
    defaultValues: {
      name: data?.koAlbumName ?? "",
      enName: data?.enAlbumName ?? "",
      memberId: data?.artist?.memberId ?? -1,
    },
  });

  useEffect(() => {
    if (data) {
      methods.reset({
        name: data?.koAlbumName ?? "",
        enName: data?.enAlbumName ?? "",
        memberId: data?.artist?.memberId ?? -1,
      });
    }
  }, [data, methods]);

  const onSubmit: SubmitHandler<IAlbumFieldValues> = (formData) => {
    mutate(formData);
  };

  return (
    <section className={ml("container")}>
      <h1 className={ml("title")}>앨범 수정</h1>
      <ArtboardLayout>
        <FormProvider {...methods}>
          {!isAlbumInfoLoading ? (
            <div className={cx("container")}>
              <div className={cx("albumInfoContainer")}>
                <SectionLayout title="앨범 아트 변경">
                  <div>
                    <ImageUploader
                      shape="square"
                      onUpload={() => { return Promise.resolve(); }}
                      defaultUrl={data?.albumImage}
                    />
                    <span className={cx("sizeLimitText")}>*이미지 크기는 6MB 이하로 업로드 해주세요.</span>
                  </div>
                </SectionLayout>
                <SectionHr />
                <SectionLayout title="앨범 정보 수정">
                  <AlbumForm submitBtnText={!isUpdateLoading ? "앨범 수정하기" : "수정 요청중..."} onSubmit={onSubmit} />
                </SectionLayout>
              </div>
              <SectionHr isThick />
              <SectionLayout title="수록곡 목록">
                <AlbumTrackListTable
                  albumId={data?.albumId ?? -1}
                  tracks={data?.tracks ?? []}
                />
              </SectionLayout>
            </div>
          ) : <div className={cx("loadingContainer")}><Orbit dark /></div>}
        </FormProvider>
      </ArtboardLayout>
    </section>
  );
};

export default AlbumEditPage;
