import { ChangeEvent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import AlbumForm from "@/components/album/AlbumForm/AlbumForm";
import ImageUploader from "@/components/common/ImageUploader/ImageUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import { IPostAlbumData } from "@/services/api/types/albums";
import useCreateAlbum from "@/services/queries/albums/useCreateAlbum";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export interface IAlbumFieldValues extends IPostAlbumData {}

const AlbumCreatePage = () => {
  const methods = useForm<IAlbumFieldValues>({ mode: "onBlur" });
  const { mutate: createAlbum, isLoading } = useCreateAlbum();
  const onSubmit:SubmitHandler<IAlbumFieldValues> = (data) => {
    createAlbum(data);
  };
  return (
    <MainLayout title="앨범 등록">
      <ArtboardLayout>
        <FormProvider {...methods}>
          <div className={cx("container")}>
            <SectionLayout title="앨범 아트 업로드">
              <div>
                <ImageUploader
                  shape="square"
                  {...methods.register("file", {
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files?.[0]) {
                        methods.setValue("file", e.target.files[0]);
                      }
                    },
                  })}
                  onUpload={() => { return Promise.resolve(); }}
                />
                <span className={cx("sizeLimitText")}>*이미지 크기는 6MB 이하로 업로드 해주세요.</span>
              </div>
            </SectionLayout>
            <SectionHr />
            <SectionLayout title="앨범 정보 입력">
              <AlbumForm submitBtnText={!isLoading ? "앨범 등록하기" : "등록하는 중..."} onSubmit={onSubmit} />
            </SectionLayout>
          </div>
        </FormProvider>
      </ArtboardLayout>
    </MainLayout>
  );
};

export default AlbumCreatePage;
