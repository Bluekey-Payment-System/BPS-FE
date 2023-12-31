import { ParsedUrlQuery } from "querystring";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import ExcelFileUploader from "@/components/common/ExcelFileUploader/ExcelFileUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import LoadingSection from "@/components/common/Loading/LoadingSection";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import UploadHistroyTable from "@/components/upload-revenue/UploadHistoryTable/UploadHistoryTable";
import { getTransaction } from "@/services/api/requests/transaction/transaction.get.api";
import { useUploadHistoryGet } from "@/services/queries/upload-revenue/useRevenueUploadHistory";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

interface UploadRevenuePageProps {
  month: string,
}

const UploadRevenuePage = (
  { month }: InferGetServerSidePropsType<GetServerSideProps<UploadRevenuePageProps>>,
) => {
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
            <ExcelFileUploader month={month} />
          </SectionLayout>
          <SectionHr isThick />
          <SectionLayout title="업로드 내역">
            {(isLoading || isFetching)
              ? <LoadingSection height={218} dark />
              : (
                <UploadHistroyTable
                  uploadList={revenueUploadHistory!.contents}
                  month={month}
                />
              )}
          </SectionLayout>
        </div>
      </ArtboardLayout>
    </MainLayoutWithDropdown>
  );
};

interface UploadRevenuePageQuery extends ParsedUrlQuery {
  month: string,
}

const getServerSideProps: GetServerSideProps<UploadRevenuePageProps> = async ({ query, req }) => {
  // TODO: [month] 값이 없는 url의 경우 에러로 리다이렉트 처리 필요
  const { month } = query as UploadRevenuePageQuery;

  const isCSR = req.url?.startsWith("/_next");
  if (isCSR) {
    return {
      props: {
        month,
      },
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [MEMBER_TYPE.ADMIN, "revenue-upload-history", month],
    () => { return getTransaction(month); },
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      month,
    },
  };
};

export { getServerSideProps };
export default UploadRevenuePage;
