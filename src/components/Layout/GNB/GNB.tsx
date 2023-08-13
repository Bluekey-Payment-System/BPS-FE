import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import styles from "./GNB.module.scss";

const cx = classNames.bind(styles);

const GNB = () => {
  return (
    <div className={cx("gnbBox")}>
      <Link href="/dashboard">
        <Image src="/images/bluekey-logo-pc.svg" width={153} height={36} alt="블루키 뮤직" />
      </Link>
    </div>
  );
};

export default GNB;
