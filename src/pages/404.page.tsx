import Button from "@/components/common/CommonBtns/Button/Button";
import FallbackPageLayout from "@/components/layout/FallbackPageLayout";

const Custom404 = () => {
  return (
    <FallbackPageLayout
      pageType="404"
      description={`페이지의 주소가 잘못 입력되었거나,
        주소가 변경 혹은 삭제되어 현재 페이지를 찾을 수 없습니다.
        주소를 다시 확인해주세요.`}
      buttonElements={(
        // TODO: 버튼 핸들러 달기
        <>
          <Button size="medium" theme="dark" onClick={() => { }}>홈(대시보드)으로 가기</Button>
          <Button size="medium" theme="bright" onClick={() => { }}>뒤로가기</Button>
        </>
      )}
    />
  );
};
export default Custom404;
