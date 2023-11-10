import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";
import { useRouter } from "next/router";

import AddTrackModal from "@/components/album/AddTrackModal/AddTrackModal";
import AlbumForm from "@/components/album/AlbumForm/AlbumForm";
import AlbumTrackListTable from "@/components/album/AlbumTrackListTable/AlbumTrackListTable";
import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import EmptyData from "@/components/common/EmptyData/EmptyData";
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
  const { mutate, mutateAsync, isLoading: isUpdateLoading } = useUpdateAlbumInfo();
  const methods = useForm<IAlbumFieldValues>({
    mode: "onBlur",
    defaultValues: {
      name: data?.name ?? "",
      enName: data?.enName ?? "",
      memberId: data?.artist?.memberId ?? -1,
    },
  });
  const [isAddTrackModalOpen, setIsAddTrackModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      methods.reset({
        name: data?.name ?? "",
        enName: data?.enName ?? "",
        memberId: data?.artist?.memberId ?? -1,
      });
    }
  }, [data, methods]);

  const onSubmit: SubmitHandler<IAlbumFieldValues> = (formData) => {
    mutate(formData);
  };

  const handleUploadImage = async (file: File) => {
    await mutateAsync({ ...methods.getValues(), albumImage: file });
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
                      onUpload={handleUploadImage}
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
                <div className={cx("trackListContainer")}>
                  <div className={cx("addBtnContainer")}>
                    <ChipButton size="large" onClick={() => { setIsAddTrackModalOpen(true); }}>수록곡 추가</ChipButton>
                  </div>
                  {(data?.tracks) && (data.tracks.length > 0)
                    ? (
                      <AlbumTrackListTable
                        albumId={data?.albumId ?? -1}
                        tracks={data?.tracks ?? []}
                      />
                    )
                    : <EmptyData type="no-data" text="수록곡이 없습니다." />}
                </div>
              </SectionLayout>
            </div>
          ) : <div className={cx("loadingContainer")}><Orbit dark /></div>}
        </FormProvider>
      </ArtboardLayout>
      <AddTrackModal
        open={isAddTrackModalOpen}
        onClose={() => { setIsAddTrackModalOpen(false); }}
        albumId={albumId}
      />
    </section>
  );
};

export default AlbumEditPage;
