import {
  QueryClient, dehydrate,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
// import { useRouter } from "next/router";

import ExcelFileUploader from "@/components/common/ExcelFileUploader/ExcelFileUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import UploadHistroyTable from "@/components/upload-revenue/UploadHistoryTable/UploadHistoryTable";
import { MOCK_TRANSACTION_UPLOAD } from "@/constants/mock";
import useRevenueUploadHistory from "@/services/queries/useRevenueUploadHistory";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [MEMBER_TYPE.ADMIN, "settlement-upload-history"],
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(MOCK_TRANSACTION_UPLOAD);
        }, 3000);
      });
    },
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const UploadRevenuePage = () => {
  // const router = useRouter();

  const {
    revenueUploadHistory, isLoading, isError, isFetching,
  } = useRevenueUploadHistory();

  if (isLoading || isFetching) {
    return (
      <div>로딩 중...</div>
    );
  }

  if (isError) {
    return (
      <div>에러 발생</div>
    );
  }

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
            <UploadHistroyTable uploadList={revenueUploadHistory?.contents} />
          </SectionLayout>
        </div>
      </ArtboardLayout>
    </MainLayoutWithDropdown>
  );
};

export { getServerSideProps };
export default UploadRevenuePage;
