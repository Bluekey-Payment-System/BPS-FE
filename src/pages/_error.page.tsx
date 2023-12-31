import { useRouter } from "next/router";
import { NextPage, NextPageContext } from "next/types";

import Button from "@/components/common/CommonBtns/Button/Button";
import FallbackPageLayout from "@/components/layout/FallbackPageLayout";
import { useAppSelector } from "@/redux/hooks";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

const Error: NextPage = ({ statusCode }: { statusCode?: number }) => {
  const router = useRouter();
  const { type, memberId } = useAppSelector((state) => { return state.user.member; });
  const homeURL = (type === MEMBER_TYPE.ADMIN)
    ? `/admin/dashboard/${getLatestYearMonthString()}`
    : `/artists/${memberId}/dashboard/${getLatestYearMonthString()}`;

  // 유의: 쿼리 훅 GET 에러는 해당 페이지가 아닌 에러 바운더리를 통해 ErrorFallback 컴포넌트가 렌더링 됨
  return (
    <FallbackPageLayout
      pageType="error"
      description={`${statusCode}: 에러가 발생했습니다.`}
      buttonElements={(
        <>
          <Button size="medium" theme="dark" onClick={() => { window.location.href = homeURL; }}>홈(대쉬보드)으로 가기</Button>
          <Button size="medium" theme="dark" onClick={() => { router.reload(); }}>새로고침</Button>
        </>
      )}
    />
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};

export default Error;
