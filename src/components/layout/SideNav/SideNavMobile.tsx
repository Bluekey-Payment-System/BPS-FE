import { SetStateAction } from "react";

import classNames from "classnames/bind";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./SideNav.module.scss";
import { ISideNavList } from "./SideNav.type";
import { isActive, isAlbumExplorer } from "./SideNav.util";

const cx = classNames.bind(styles);

const DynamicDrawer = dynamic(() => { return import("@/components/common/Drawer/Drawer"); }, { ssr: false });

interface SideNavMobileProps {
  sideNavList: ISideNavList[],
  isOpen: boolean,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>,
}

const SideNavMobile = ({ sideNavList, isOpen, setIsOpen }: SideNavMobileProps) => {
  const router = useRouter();

  return (
    <DynamicDrawer isOpen={isOpen} onClose={() => { return setIsOpen(false); }} removeWhenClosed className="mobile">
      <aside className={cx("asideContainerMobile")}>
        <div className={cx("logoContainer")}>
          <Image src="/images/bluekey-insight-logo.svg" alt="로고" width={126} height={22} />
          <Image src="/images/close.svg" alt="닫기" width={16} height={16} className={cx("close")} onClick={() => { return setIsOpen(!isOpen); }} />
        </div>
        <ul>
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
    </DynamicDrawer>
  );
};

export default SideNavMobile;
