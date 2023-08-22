import { ChangeEvent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import ArtistUploadForm from "@/components/artist/ArtistUploadForm/ArtistUploadForm";
import ImageUploader from "@/components/common/ImageUploader/ImageUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import { IArtistFieldValues } from "@/types/artist.types";

import styles from "./index.module.scss";
import { generateRandomStringWithRegex } from "./index.utils";

const cx = classNames.bind(styles);

const ArtistCreatePage = () => {
  const methods = useForm<IArtistFieldValues>({
    mode: "onBlur",
    defaultValues: {
      password: generateRandomStringWithRegex(/^[a-zA-Z0-9@$!%*?&_-]*$/, 6, 18),
      profileImage: null,
      commissionRate: null,
    },
  });

  const onSubmit: SubmitHandler<IArtistFieldValues> = (data) => {
    // TODO: /api/v1/artist 로 POST요청 (Content-Type: multipart/formData)
    // eslint-disable-next-line no-console
    console.log(data);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data));
  };

  return (
    <MainLayout title="아티스트 등록">
      <FormProvider {...methods}>
        <ArtboardLayout>
          <div className={cx("container")}>
            <SectionLayout title="아티스트 프로필 이미지 업로드">
              <div className={cx("imageUploadContainer")}>
                <ImageUploader
                  shape="circle"
                  {...methods.register("profileImage", {
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      methods.setValue("profileImage", e.target.files?.[0] ?? null);
                    },
                  })}
                />
                <span className={cx("sizeLimitText")}>*이미지 크기는 6MB 이하로 업로드 해주세요.</span>
              </div>
            </SectionLayout>
            <SectionHr />
            <SectionLayout title="아티스트 계정 정보 입력">
              <ArtistUploadForm submitBtnText="아티스트 계정 등록하기" onSubmit={onSubmit} />
            </SectionLayout>
          </div>
        </ArtboardLayout>
      </FormProvider>
    </MainLayout>
  );
};

export default ArtistCreatePage;
