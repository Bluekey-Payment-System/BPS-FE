import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";

import { SIDE_NAV_ITEMS_SUPER_ADMIN, SIDE_NAV_ITEMS_ADMIN, SIDE_NAV_ITEMS_ARTIST } from "@/constants/sidenavList";

import { SideNavProps } from "../Layout.types";

import styles from "./SideNav.module.scss";
import { ISideNavList } from "./SideNav.type";
import SideNavMobile from "./SideNavMobile";

const cx = classNames.bind(styles);

const userTypeToSideNavMap = {
  SUPER_ADMIN: SIDE_NAV_ITEMS_SUPER_ADMIN,
  ADMIN: SIDE_NAV_ITEMS_ADMIN,
  ARTIST: SIDE_NAV_ITEMS_ARTIST,
};

const SideNav = ({ isOpen, setIsOpen, type }: SideNavProps) => {
  const [sideNavList, setSideNavList] = useState<ISideNavList[]>([]);
  const router = useRouter();

  useEffect(() => {
    setSideNavList(userTypeToSideNavMap[type]);
  }, [type]);

  return (
    <>
      <aside className={cx("asideContainer")}>
        {sideNavList?.map((list) => {
          return <Link className={cx("asideItem", router.pathname === list.path && "active")} key={list.id} href={list.path}>{list.content}</Link>;
        })}
      </aside>
      <SideNavMobile sideNavList={sideNavList} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default SideNav;
