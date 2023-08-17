import classNames from "classnames/bind";
// import { useRouter } from "next/router";

import EmptyData from "@/components/common/EmptyData/EmptyData";
import ExcelFileUploader from "@/components/common/ExcelFileUploader/ExcelFileUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";

import styles from "./[[...monthYear]].module.scss";

const cx = classNames.bind(styles);

const UploadRevenuePage = () => {
  // const router = useRouter();

  return (
    <MainLayoutWithDropdown
      title="정산 내역 업로드"
      dropdownElement={(
        <div className={cx("monthYearButton")}>
          2023년 8월
        </div>
    )}
    >
      <ArtboardLayout>
        <div style={{ width: 730 }}>
          <SectionLayout title="정산 내역 파일 업로드">
            <ExcelFileUploader />
          </SectionLayout>
          <SectionHr isThick />
          <SectionLayout title="업로드 내역">
            <EmptyData type="no-data" text="업로드 내역이 없습니다." />
          </SectionLayout>
        </div>
      </ArtboardLayout>
    </MainLayoutWithDropdown>
  );
};

export default UploadRevenuePage;
