import { useRouter } from "next/router";
import { NextPage, NextPageContext } from "next/types";

import Button from "@/components/common/CommonBtns/Button/Button";
import FallbackPageLayout from "@/components/layout/FallbackPageLayout";

const Error: NextPage = ({ statusCode }: { statusCode?: number }) => {
  const router = useRouter();
  // TODO: 에러 상태 코드 및 메시지 받기
  const errorMessage = "서버 오류가 발생했습니다.";

  return (
    <FallbackPageLayout
      pageType="error"
      description={`${statusCode}: ${errorMessage}`}
      buttonElements={(
        // TODO: 버튼 핸들러 달기
        <>
          <Button size="medium" theme="dark" onClick={() => { }}>홈(대시보드)으로 가기</Button>
          <Button size="medium" theme="dark" onClick={() => { router.reload(); }}>새로고침</Button>
        </>
      )}
    />
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
