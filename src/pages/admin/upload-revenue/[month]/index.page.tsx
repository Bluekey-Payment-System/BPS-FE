import { ParsedUrlQuery } from "querystring";

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
import useUploadRevenueAlertModal from "@/hooks/useUploadRevenueAlertModal";
import { getRevenueUploadHistory } from "@/services/api/upload-revenue/upload-revenue-mock-api";
import { useUploadHistoryGet } from "@/services/queries/upload-revenue/useRevenueUploadHistory";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

interface UploadRevenuePageProps {
  month: string,
}

const MOCK_WARNINGS = [
  {
    rowIndex: 1,
    columnIndex: 2,
    columnName: "아티스트명",
    cellValue: "0.0",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
  {
    rowIndex: 2,
    columnIndex: 2,
    columnName: "앨범명",
    cellValue: "ㅁ아러ㅣㅁㅇㅁ아러ㅣㅁㅇㅁ아러ㅣㅁㅇㅁ아러ㅣㅁㅇ",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
  {
    rowIndex: 3,
    columnIndex: 3,
    columnName: "곡명",
    cellValue: "0.0",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
  {
    rowIndex: 2,
    columnIndex: 3,
    columnName: "앨범명",
    cellValue: "0.0",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
];

const UploadRevenuePage = (
  { month }: InferGetServerSidePropsType<GetServerSideProps<UploadRevenuePageProps>>,
) => {
  const {
    revenueUploadHistory, isLoading, isError, isFetching,
  } = useUploadHistoryGet(month);
  const { showUploadRevenueAlertModal } = useUploadRevenueAlertModal();

  const handleClickTestButton = () => {
    showUploadRevenueAlertModal({
      type: "warning",
      alertData: MOCK_WARNINGS,
    });
  };

  if (isError) {
    return (
      <div>에러 발생</div>
    );
  }

  if (!revenueUploadHistory) {
    return (
      <div>데이터를 가져오는 데 실패했습니다. 다시 시도해주세요</div>
    );
  }

  return (
    <MainLayoutWithDropdown
      title="정산 내역 업로드"
      dropdownElement={(
        <MonthPickerDropdown />
      )}
    >
      <button type="button" onClick={handleClickTestButton}>클릭!</button>
      <ArtboardLayout>
        <div style={{ width: 730 }}>
          <SectionLayout title="정산 내역 파일 업로드">
            <ExcelFileUploader />
          </SectionLayout>
          <SectionHr isThick />
          <SectionLayout title="업로드 내역">
            {(isLoading || isFetching)
              ? <Loading height={218} />
              : (
                <UploadHistroyTable
                  uploadList={revenueUploadHistory.contents}
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
    [MEMBER_TYPE.ADMIN, "revenue-upload-history"],
    () => { return getRevenueUploadHistory(month); },
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
