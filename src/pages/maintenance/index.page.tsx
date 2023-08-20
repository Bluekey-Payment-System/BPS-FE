import FallbackPageLayout from "@/components/layout/FallbackPageLayout";

const MainTenance = () => {
  // TODO: 점검 시간, 이유 반영
  const checkingDate = "2023/8/20";
  const checkingTime = "오후 4:00 ~ 오후 8:00";
  const checkingReason = "서비스 긴급점검";
  return (
    <FallbackPageLayout
      pageType="systemChecking"
      descriptions={[[
        "보다 나은 서비스를 위해 정기 점검을 진행 중입니다.",
        "이용에 불편을 드린 점 진심으로 사과 드리며,",
        "예정된 시간 내에 정상적으로 서비스를 재개할 수 있도록 최선을 다하겠습니다.",
      ], [
        `일자: ${checkingDate}`,
        `시간: ${checkingTime}`,
        `사유: ${checkingReason}`,
      ]]}
    />
  );
};

export default MainTenance;