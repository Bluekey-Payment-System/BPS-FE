import { useState } from "react";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import ImageUploader from "@/components/common/ImageUploader/ImageUploader";
import TextField from "@/components/common/Inputs/TextField/TextField";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import Spacing from "@/components/common/Layouts/Spacing";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const AlbumCreatePage = () => {
  const [artist, setArtist] = useState("");
  return (
    <MainLayout title="앨범 등록">
      <ArtboardLayout>
        <div className={cx("container")}>
          <SectionLayout title="앨범 아트 업로드">
            <div className={cx("imageUploadContainer")}>
              <ImageUploader shape="square" />
              <span className={cx("sizeLimitText")}>*이미지 크기는 6MB 이하로 업로드 해주세요.</span>
            </div>
          </SectionLayout>
          <SectionHr />
          <SectionLayout title="앨범 정보 입력">
            <form className={cx("form")}>
              <TextField label="*앨범명 (한글)" errors={{}} />
              <TextField label="*앨범명 (영문)" errors={{}} />
              <div className={cx("dropdownContainer")}>
                <span>대표 아티스트</span>
                <Dropdown
                  theme="hasSearchBar"
                  hasSearchBar
                  dropdownListData={[
                    // TODO: db에 있는 모든 아티스트 names를 가져와서(api) 여기에 뿌리기
                    "혁기", "지미가드너", "53x", "송민섭",
                  ]}
                  onClick={(value) => { setArtist(value); }}
                />
                <input name="artist" type="hidden" value={artist} />
                <Spacing size={14} />
              </div>
              <Spacing size={0} />
              <Button theme="dark" size="large" type="submit" style={{ marginTop: "26px", width: "218px" }}>앨범 등록하기</Button>
            </form>
          </SectionLayout>
        </div>
      </ArtboardLayout>
    </MainLayout>
  );
};

export default AlbumCreatePage;
