import classNames from "classnames/bind";

import ImageUploader from "@/components/common/ImageUploader/ImageUploader";
import Checkbox from "@/components/common/Inputs/Checkbox/Checkbox";
import TextField from "@/components/common/Inputs/TextField/TextField";
import TextFieldWithCopy from "@/components/common/Inputs/TextFieldWithCopy/TextFieldWithCopy";
import TextFieldWithUnit from "@/components/common/Inputs/TextFieldWithUnit/TextFieldWithUnit";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const ArtistCreatePage = () => {
  return (
    <MainLayout title="아티스트 등록">
      <ArtboardLayout>
        <div className={cx("container")}>
          <section className={cx("profileImageSection")}>
            <h1 className={cx("title")}>아티스트 프로필 이미지 업로드</h1>
            <div className={cx("imageUploadContainer")}>
              <ImageUploader shape="circle" />
              {/* <Spacing direction="horizontal" size={10} /> */}
              <span className={cx("sizeLimitText")}>*이미지 크기는 6MB 이하로 업로드 해주세요.</span>
            </div>
          </section>
          <SectionHr />
          <section className={cx("artistInfoSection")}>
            <h1 className={cx("title")}>아티스트 계정 정보 입력</h1>
            <form className={cx("form")}>
              <div className={cx("checkboxContainer")}>
                <Checkbox label="영문과 동일" />
              </div>
              <TextField label="활동 예명(한글)" errors={{}} />
              <TextField label="활동 예명(영문)" errors={{}} />
              <TextField label="계정 아이디" errors={{}} />
              <TextField label="계정 이메일" errors={{}} />
              <TextFieldWithCopy label="임시 비밀번호" errors={{}} />
              <TextFieldWithUnit label="기본 요율" unit="%" errors={{}} />
            </form>
          </section>
        </div>
      </ArtboardLayout>
    </MainLayout>
  );
};

export default ArtistCreatePage;
