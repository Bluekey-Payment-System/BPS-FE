import {
  QueryClient, UseQueryResult, dehydrate, useMutation, useQuery, useQueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
// import { useRouter } from "next/router";

import ExcelFileUploader from "@/components/common/ExcelFileUploader/ExcelFileUploader";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import UploadHistroyTable from "@/components/uploadRevenue/UploadHistoryTable/UploadHistoryTable";
import { MOCK_TRANSACTION_UPLOAD } from "@/constants/mock";
import { IGETTransactionUploadResponse } from "@/services/api/types/transaction";
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
  const queryClient = useQueryClient();

  const { data }: UseQueryResult<IGETTransactionUploadResponse> = useQuery(
    [MEMBER_TYPE.ADMIN, "settlement-upload-history"],
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(MOCK_TRANSACTION_UPLOAD);
        }, 3000);
      });
    },
    {
      staleTime: Infinity,
    },
  );

  const mutationTest = useMutation(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Mutation Success!");
      }, 2000);
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries([MEMBER_TYPE.ADMIN, "settlement-upload-history"]);
    },
  });

  const handleMutationTest = () => {
    mutationTest.mutate();
  };

  return (
    <MainLayoutWithDropdown
      title="정산 내역 업로드"
      dropdownElement={(
        <MonthPickerDropdown />
    )}
    >
      <button type="button" onClick={handleMutationTest}>클릭!</button>
      <ArtboardLayout>
        <div style={{ width: 730 }}>
          <SectionLayout title="정산 내역 파일 업로드">
            <ExcelFileUploader />
          </SectionLayout>
          <SectionHr isThick />
          <SectionLayout title="업로드 내역">
            <UploadHistroyTable uploadList={data?.contents} />
          </SectionLayout>
        </div>
      </ArtboardLayout>
    </MainLayoutWithDropdown>
  );
};

export { getServerSideProps };
export default UploadRevenuePage;
