import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import ImageUploader from "@/components/common/ImageUploader/ImageUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import AdminProfileForm from "@/components/my-profile/AdminProfileForm/AdminProfileForm";
import { useAppSelector } from "@/redux/hooks";
import { IAdminUpdateProfileFieldValues } from "@/types/dto";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const AdminMyProfilePage = () => {
  const userInfo = useAppSelector((state) => { return state.user.member; });
  const methods = useForm<IAdminUpdateProfileFieldValues>({
    defaultValues: {
      email: userInfo?.email,
      nickName: userInfo?.nickName,
    },
  });
  const onSubmit:SubmitHandler<IAdminUpdateProfileFieldValues> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
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
                  defaultUrl={userInfo?.profileImage}
                />
                <span className={cx("sizeLimitText")}>*이미지 크기는 6MB 이하로 업로드 해주세요.</span>
              </div>
            </SectionLayout>
            <SectionHr />
            <SectionLayout title="내 프로필 정보 수정">
              <AdminProfileForm onSubmit={onSubmit} loginId={userInfo?.loginId as string} />
            </SectionLayout>
          </div>
        </FormProvider>
      </ArtboardLayout>
    </MainLayout>
  );
};

export default AdminMyProfilePage;
