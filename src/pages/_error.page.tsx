import Button from "@/components/common/CommonBtns/Button/Button";
import FallbackPageLayout from "@/components/layout/FallbackPageLayout";

const Error = () => {
  // TODO: 에러 상태 코드 및 메시지 받기
  const statusCode = 500;
  const errorMessage = "서버 오류가 발생했습니다.";

  return (
    <FallbackPageLayout
      pageType="error"
      description={`${statusCode}: ${errorMessage}`}
      buttonElements={(
        // TODO: 버튼 핸들러 달기
        <>
          <Button size="medium" theme="dark" onClick={() => { }}>홈(대시보드)으로 가기</Button>
          <Button size="medium" theme="dark" onClick={() => { }}>새로고침</Button>
        </>
      )}
    />
  );
};

export default Error;
