import Button from "@/components/common/CommonBtns/Button/Button";
import FallbackPageLayout from "@/components/layout/FallbackPageLayout";

const Pending = () => {
  return (
    <FallbackPageLayout
      pageType="approvalWaiting"
      description={`최고 관리자에게 관리자 권한에대한 요청이 발송되었습니다.
      승인 후 관리자로 활동 가능합니다.`}
      buttonElements={(
        // TODO: 버튼 핸들러 달기
        <Button size="large" theme="dark" onClick={() => { }}>로그아웃</Button>
      )}
    />
  );
};

export default Pending;
