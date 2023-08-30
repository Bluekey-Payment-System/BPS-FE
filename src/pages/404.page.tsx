import { useRouter } from "next/router";

import Button from "@/components/common/CommonBtns/Button/Button";
import FallbackPageLayout from "@/components/layout/FallbackPageLayout";
import { useAppSelector } from "@/redux/hooks";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

const Custom404 = () => {
  const router = useRouter();
  const { type, memberId } = useAppSelector((state) => { return state.user.member; });
  const homeURL = (type === MEMBER_TYPE.ADMIN)
    ? `/admin/dashboard/${getLatestYearMonthString()}`
    : `/artists/${memberId}/dashboard/${getLatestYearMonthString()}`;
  return (
    <FallbackPageLayout
      pageType="notFound"
      description={`페이지의 주소가 잘못 입력되었거나,
        주소가 변경 혹은 삭제되어 현재 페이지를 찾을 수 없습니다.
        주소를 다시 확인해주세요.`}
      buttonElements={(
        <>
          <Button size="medium" theme="dark" onClick={() => { window.location.href = homeURL; }}>홈(대쉬보드)으로 가기</Button>
          <Button size="medium" theme="bright" onClick={() => { router.back(); }}>뒤로가기</Button>
        </>
      )}
    />
  );
};
export default Custom404;
