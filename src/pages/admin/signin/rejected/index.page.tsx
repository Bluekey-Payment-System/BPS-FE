import { useDispatch } from "react-redux";

import { useRouter } from "next/router";

import Button from "@/components/common/CommonBtns/Button/Button";
import FallbackPageLayout from "@/components/layout/FallbackPageLayout";
import useToast from "@/hooks/useToast";
import { resetUser } from "@/redux/slices/userSlice";
import { useRequestAuthority } from "@/services/queries/notification-controller/useRequestAuthorities";
import { removeCookie } from "@/utils/cookies";

const AdminRejectedPage = () => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate: requestAuthority } = useRequestAuthority();
  const handleSignout = async () => {
    setTimeout(() => { dispatch(resetUser()); }, 500);
    removeCookie("token", { path: "/" });
    showToast("로그아웃 되었습니다.");
    await router.push("/admin/signin");
  };
  return (
    <FallbackPageLayout
      pageType="approvalRejected"
      description="권한 재요청은 최대 5회까지 가능합니다."
      buttonElements={(
        <>
          <Button size="medium" theme="dark" onClick={requestAuthority}>권한 재요청하기</Button>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Button size="medium" theme="bright" onClick={handleSignout}>로그아웃</Button>
        </>
      )}
    />
  );
};

export default AdminRejectedPage;
