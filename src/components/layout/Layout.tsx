import { useState } from "react";

import classNames from "classnames/bind";

import { useAppSelector } from "@/redux/hooks";
import { MemberRole } from "@/types/enums/user.enum";

import GNB from "./GNB/GNB";
import styles from "./Layout.module.scss";
import SideNav from "./SideNav/SideNav";

const cx = classNames.bind(styles);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useAppSelector((state) => { return state.user.member; });
  return (
    <>
      <GNB
        role={userInfo.role as MemberRole}
        loginId={userInfo.loginId}
        profileImage={userInfo.profileImage}
        onClickMenu={setIsOpen}
      />
      <div className={cx("sideContentContainer")}>
        <SideNav
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          role={userInfo.role as MemberRole}
          memberId={userInfo.memberId}
        />
        <div className={cx("content")}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
