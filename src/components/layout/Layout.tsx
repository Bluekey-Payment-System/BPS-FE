import { useState } from "react";

import { useAppSelector } from "@/redux/hooks";

import GNB from "./GNB/GNB";
import SideNav from "./SideNav/SideNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useAppSelector((state) => { return state.user.member; });
  return (
    <>
      <GNB
        type={userInfo.type}
        loginId={userInfo.loginId}
        profileImage={userInfo.profileImage}
        onClickMenu={setIsOpen}
      />
      <div style={{ display: "flex" }}>
        <SideNav isOpen={isOpen} setIsOpen={setIsOpen} type={userInfo.type} />
        {children}
      </div>
    </>
  );
};

export default Layout;
