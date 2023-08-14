import { SetStateAction, useEffect, useState } from "react";

import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAppSelector } from "@/redux/hooks";

import styles from "./SideNav.module.scss";
import { ISideNavList } from "./SideNav.type";
import { ADMIN, ARTIST, SUPER_ADMIN } from "./SideNav.utils";
import SideNavMobile from "./SideNavMobile";

const cx = classNames.bind(styles);

const userTypeToSideNavMap = {
  SUPER_ADMIN,
  ADMIN,
  ARTIST,
};

type UserType = keyof typeof userTypeToSideNavMap;

interface SideNavProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>,
}

const SideNav = ({ isOpen, setIsOpen }: SideNavProps) => {
  const [sideNavList, setSideNavList] = useState<ISideNavList[]>([]);
  const router = useRouter();
  const userType = useAppSelector((state) => { return state.user.member.type as UserType; });

  useEffect(() => {
    setSideNavList(userTypeToSideNavMap[userType]);
  }, [userType]);

  return (
    <div className="app">
      <aside className={cx("asideContainer")}>
        {sideNavList?.map((list) => {
          return <Link className={cx("asideItem", router.pathname === list.path && "active")} key={list.id} href={list.path}>{list.content}</Link>;
        })}
      </aside>
      <SideNavMobile sideNavList={sideNavList} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default SideNav;
