import { ReactNode } from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./AuthPageLayout.module.scss";

const cx = classNames.bind(styles);

const AuthPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cx("container")}>
      <div className={cx("gradientContainer")}>
        <Image src="/images/gradient.png" alt="배경 그라디언트" fill />
      </div>
      <div className={cx("fadingLayer")} />
      {children}
    </div>
  );
};

export default AuthPageLayout;
