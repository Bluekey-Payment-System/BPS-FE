/* eslint-disable no-void */
import { useEffect } from "react";

import { useRouter } from "next/router";

import LoadingSection from "@/components/common/Loading/LoadingSection";
import { useAppSelector } from "@/redux/hooks";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

const Home = () => {
  const userInfo = useAppSelector((state) => { return state.user.member; });
  const router = useRouter();
  useEffect(() => {
    if (userInfo.type === MEMBER_TYPE.USER) {
      void router.push(`/artists/${userInfo.memberId}/dashboard/${getLatestYearMonthString()}`);
    }
    void router.push(`/admin/dashboard/${getLatestYearMonthString()}`);
  }, [router, userInfo.memberId, userInfo.type]);

  return (
    <LoadingSection />
  );
};

export default Home;
