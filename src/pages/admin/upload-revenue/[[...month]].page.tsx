import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import ExcelFileUploader from "@/components/common/ExcelFileUploader/ExcelFileUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import Loading from "@/components/common/Loading/Loading";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import UploadHistroyTable from "@/components/upload-revenue/UploadHistoryTable/UploadHistoryTable";
import { getRevenueUploadHistory, useUploadHistoryGet } from "@/services/queries/upload-revenue/useRevenueUploadHistory";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import convertYearMonthToQuery from "@/utils/convertYearMonthToQuery";

const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();
  const { month } = query;
  const monthToQueryString = convertYearMonthToQuery(month && month[0]);

  await queryClient.prefetchQuery(
    [MEMBER_TYPE.ADMIN, "settlement-upload-history"],
    () => { return getRevenueUploadHistory(monthToQueryString); },
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      month: monthToQueryString,
    },
  };
};

const UploadRevenuePage = (
  { month } : { month: string },
): InferGetServerSidePropsType<typeof getServerSideProps> => {
  const {
    revenueUploadHistory, isLoading, isError, isFetching,
  } = useUploadHistoryGet(month);

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
            {(isLoading || isFetching)
              ? <Loading width="100%" height={218} />
              : <UploadHistroyTable uploadList={revenueUploadHistory?.contents} />}
          </SectionLayout>
        </div>
      </ArtboardLayout>
    </MainLayoutWithDropdown>
  );
};

export { getServerSideProps };
export default UploadRevenuePage;
