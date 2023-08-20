import Button from "@/components/common/CommonBtns/Button/Button";
import FallbackPageLayout from "@/components/layout/FallbackPageLayout";

const Rejected = () => {
  return (
    <FallbackPageLayout
      pageType="approvalRejected"
      descriptions={[[
        "권한을 재요청하여 일주일 내로 승인되지 않을 시,",
        "자동으로 회원정보가 삭제됩니다.",
      ]]}
      buttonElements={(
        // TODO: 버튼 핸들러 달기
        <Button size="large" theme="bright" onClick={() => { }}>관리자 권한 재요청하기</Button>
      )}
    />
  );
};

export default Rejected;
