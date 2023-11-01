import { useDispatch } from "react-redux";

import { useRouter } from "next/router";

import Button from "@/components/common/CommonBtns/Button/Button";
import FallbackPageLayout from "@/components/layout/FallbackPageLayout";
import useToast from "@/hooks/useToast";
import { resetUser } from "@/redux/slices/userSlice";
import { removeCookie } from "@/utils/cookies";

const AdminPendingPage = () => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSignout = async () => {
    setTimeout(() => { dispatch(resetUser()); }, 500);
    removeCookie("token", { path: "/" });
    showToast("로그아웃 되었습니다.");
    await router.push("/admin/signin");
  };
  return (
    <FallbackPageLayout
      pageType="approvalPending"
      description={`최고 관리자에게 관리자 권한에대한 요청이 발송되었습니다.
    승인 후 관리자로 활동 가능합니다.`}
      buttonElements={(
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Button size="large" theme="dark" onClick={handleSignout}>로그아웃</Button>
)}
    />
  );
};

export default AdminPendingPage;
