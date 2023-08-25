import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";

import { SIDE_NAV_ITEMS_SUPER_ADMIN, SIDE_NAV_ITEMS_ADMIN, SIDE_NAV_ITEMS_ARTIST } from "@/constants/sidenavList";

import { SideNavProps } from "../Layout.types";

import styles from "./SideNav.module.scss";
import { ISideNavList } from "./SideNav.type";
import { isActive } from "./SideNav.util";
import SideNavMobile from "./SideNavMobile";

const cx = classNames.bind(styles);

const userRoleToSideNavMap = {
  SUPER_ADMIN: SIDE_NAV_ITEMS_SUPER_ADMIN,
  ADMIN: SIDE_NAV_ITEMS_ADMIN,
  ARTIST: SIDE_NAV_ITEMS_ARTIST,
};

const SideNav = ({ isOpen, setIsOpen, role }: SideNavProps) => {
  const [sideNavList, setSideNavList] = useState<ISideNavList[]>([]);
  const router = useRouter();

  useEffect(() => {
    setSideNavList(userRoleToSideNavMap[role]);
  }, [role]);

  return (
    <>
      <aside className={cx("asideContainer")}>
        <ul className={cx("linkContainer")}>
          {sideNavList?.map((list) => {
            return (
              <li key={list.id}>
                <Link className={cx("asideItem", isActive(router.asPath, list.path) && "active")} href={list.path}>{list.content}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <SideNavMobile sideNavList={sideNavList} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default SideNav;
