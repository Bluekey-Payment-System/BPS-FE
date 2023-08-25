import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import ImageUploader from "@/components/common/ImageUploader/ImageUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import Orbit from "@/components/common/Loading/Orbit";
import ArtistProfileForm from "@/components/my-profile/ArtistProfileForm/ArtistProfileForm";
import { useAppSelector } from "@/redux/hooks";
import { useUpdateArtistMyProfileImage, useUpdateArtistMyProfileInfo } from "@/services/queries/my-profile/useUpdateProfile";
import { IArtistProfile, IArtistUpdateProfileFieldValues } from "@/types/dto";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const ArtistMyProfilePage = () => {
  const userInfo = useAppSelector((state) => { return state.user.member as IArtistProfile; });
  // 프로필 정보(닉네임, 이메일) 수정 쿼리
  const {
    mutate, isLoading,
  } = useUpdateArtistMyProfileInfo();
    // 프로밀 이미지 수정 쿼리
  const {
    mutateAsync: mutateImageAsync,
  } = useUpdateArtistMyProfileImage();

  const methods = useForm<IArtistUpdateProfileFieldValues>({
    defaultValues: {
      email: userInfo.email ?? "",
    },
  });

  const onSubmit:SubmitHandler<IArtistUpdateProfileFieldValues> = (data) => {
    mutate(data);
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const handleUploadImage = async (file: File) => {
    await mutateImageAsync({ profileImage: file });
  };

  return (
    <MainLayout title="내 프로필">
      <ArtboardLayout>
        <FormProvider {...methods}>
          <div className={cx("container")}>
            <SectionLayout title="내 프로필 이미지 업로드">
              <div className={cx("imageUploadContainer")}>
                <ImageUploader
                  shape="circle"
                  {...methods.register("profileImage")}
                  onUpload={handleUploadImage}
                  defaultUrl={userInfo.profileImage}
                />
                <span className={cx("sizeLimitText")}>*이미지 크기는 6MB 이하로 업로드 해주세요.</span>
              </div>
            </SectionLayout>
            <SectionHr />
            <SectionLayout title="내 프로필 정보 수정">
              <ArtistProfileForm
                loginId={userInfo.loginId}
                name={userInfo.name}
                enName={userInfo.enName}
                onSubmit={onSubmit}
              />
            </SectionLayout>
          </div>
        </FormProvider>
        {isLoading && <div className={cx("loadingContainer")}><Orbit /></div>}
      </ArtboardLayout>
    </MainLayout>
  );
};

export default ArtistMyProfilePage;
