import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";

import useSideNavList from "@/hooks/useSideNavList";

import { SideNavProps } from "../Layout.types";

import styles from "./SideNav.module.scss";
import { isActive, isAlbumExplorer } from "./SideNav.util";
import SideNavMobile from "./SideNavMobile";

const cx = classNames.bind(styles);

const SideNav = ({
  isOpen, setIsOpen, role, memberId,
}: SideNavProps) => {
  const router = useRouter();
  const sideNavList = useSideNavList(role, memberId);

  return (
    <>
      <aside className={cx("asideContainer")}>
        <ul className={cx("linkContainer")}>
          {sideNavList?.map((list) => {
            return (
              <li key={list.id}>
                <Link
                  className={cx(
                    "asideItem",
                    isActive(router.asPath, list.path) && "active",
                    isAlbumExplorer(router.asPath, list.path) && "albumExplorer",
                  )}
                  href={Array.isArray(list.path) ? list.path[0] : list.path}
                >
                  {list.content}
                </Link>
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
