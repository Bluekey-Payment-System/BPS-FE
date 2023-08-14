import { SetStateAction } from "react";

import classNames from "classnames/bind";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./SideNav.module.scss";
import { ISideNavList } from "./SideNav.type";

const cx = classNames.bind(styles);

const DynamicDrawer = dynamic(() => { return import("@/components/common/Drawer/Drawer"); }, { ssr: false });

interface SideNavMobileProps {
  sideNavList: ISideNavList[],
  isOpen: boolean,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const SideNavMobile = ({ sideNavList, isOpen, setIsOpen }: SideNavMobileProps) => {
  const router = useRouter();

  return (
    <DynamicDrawer isOpen={isOpen} onClose={() => { return setIsOpen(false); }} removeWhenClosed className="mobile">
      <aside className={cx("asideContainerMobile")}>
        <div className={cx("logoContainer")}>
          <Image src="/images/mobile-logo.svg" alt="로고" width={172} height={29} />
          <Image src="/images/close.svg" alt="닫기" width={16} height={16} className={cx("close")} onClick={() => { return setIsOpen(!isOpen); }} />
        </div>
        {sideNavList?.map((list) => {
          return <Link className={cx("asideItem", router.pathname === list.path && "active")} key={list.id} href={list.path}>{list.content}</Link>;
        })}
      </aside>
    </DynamicDrawer>
  );
};

export default SideNavMobile;
