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
      <div className={cx("formSectionWrapper")}>
        <section className={cx("formSection")}>
          <div className={cx("logoContainer")}>
            <Image src="/images/bluekey-music-insight-logo.svg" alt="로고" fill />
          </div>
          {children}
          <span className={cx("versionText")}>version 1.0.0</span>
        </section>
      </div>
    </div>
  );
};

export default AuthPageLayout;
