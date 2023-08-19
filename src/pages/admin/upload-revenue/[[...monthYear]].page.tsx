// import { useRouter } from "next/router";

import EmptyData from "@/components/common/EmptyData/EmptyData";
import ExcelFileUploader from "@/components/common/ExcelFileUploader/ExcelFileUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import UploadHistroyTable from "@/components/uploadRevenue/UploadHistoryTable/UploadHistoryTable";

const UploadRevenuePage = () => {
  return (
    <MainLayoutWithDropdown
      title="정산 내역 업로드"
      dropdownElement={(
        <MonthPickerDropdown />
    )}
    >
      <ArtboardLayout>
        <div style={{ width: 730 }}>
          <SectionLayout title="정산 내역 파일 업로드">
            <ExcelFileUploader />
          </SectionLayout>
          <SectionHr isThick />
          <SectionLayout title="업로드 내역">
            {/* <EmptyData type="no-data" text="업로드 내역이 없습니다." /> */}
            <UploadHistroyTable />
          </SectionLayout>
        </div>
      </ArtboardLayout>
    </MainLayoutWithDropdown>
  );
};

export default UploadRevenuePage;
