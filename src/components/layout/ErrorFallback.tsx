/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FallbackProps } from "react-error-boundary";

import { isAxiosError } from "axios";
import { useRouter } from "next/router";

import Button from "@/components/common/CommonBtns/Button/Button";
import FallbackPageLayout from "@/components/layout/FallbackPageLayout";
import { ERROR_MAP } from "@/constants/errorFallback";
import { useAppSelector } from "@/redux/hooks";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

const ErrorFallback = ({ error }: FallbackProps) => {
  const router = useRouter();
  const { type, memberId } = useAppSelector((state) => { return state.user.member; });
  const homeURL = type === "ADMIN"
    ? `/admin/dashboard/${getLatestYearMonthString()}`
    : `/artists/${memberId}/dashboard/${getLatestYearMonthString()}`;

  let errorDescription;

  if (!isAxiosError(error) || !error?.response?.status) {
    errorDescription = "알 수 없는 에러가 발생했습니다.";
  } else if (!error.response?.data?.message) {
    if (!(error.response.status in ERROR_MAP)) {
      errorDescription = `${error.response.status}: 알 수 없는 에러가 발생했습니다.`;
    } else {
      errorDescription = `${error.response.status}: ${ERROR_MAP[error.response.status]}`;
    }
  } else {
    errorDescription = `${error.response.status}: ${error.response.data.message}`;
  }

  return (
    <FallbackPageLayout
      pageType="error"
      description={errorDescription}
      buttonElements={(
        <>
          <Button size="medium" theme="dark" onClick={() => { window.location.href = homeURL; }}>홈(대시보드)으로 가기</Button>
          <Button size="medium" theme="dark" onClick={() => { router.reload(); }}>새로고침</Button>
        </>
      )}
    />
  );
};

export default ErrorFallback;
