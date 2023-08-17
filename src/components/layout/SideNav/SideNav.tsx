import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";

import { SideNavProps } from "../Layout.types";

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

const SideNav = ({ isOpen, setIsOpen, type }: SideNavProps) => {
  const [sideNavList, setSideNavList] = useState<ISideNavList[]>([]);
  const router = useRouter();

  useEffect(() => {
    setSideNavList(userTypeToSideNavMap[type]);
  }, [type]);

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
