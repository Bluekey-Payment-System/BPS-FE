import classNames from "classnames/bind";
import Image from "next/image";

import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";

import styles from "./AlbumDetailsInformationTooltip.module.scss";

const cx = classNames.bind(styles);

const AlbumDetailsInformationTooltip = () => {
  return (
    <TooltipRoot
      message={`본 페이지의 모든 지표는
    본인이 참여한 트랙에 대한 수치만
    반영한 값입니다.`}
      alwaysVisible
    >
      <Image src="/images/information.svg" alt="정보" width={22} height={22} className={cx("information")} />
    </TooltipRoot>
  );
};

export default AlbumDetailsInformationTooltip;
