import classNames from "classnames/bind";
import Image from "next/image";

import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import TooltipRoot from "@/components/common/Tooltip/TooltipRoot";
import { MEMBER_TYPE, MemberType } from "@/types/enums/user.enum";

import styles from "./AlbumDetailsInformationTooltip.module.scss";

const cx = classNames.bind(styles);

const AlbumDetailsInformationTooltip = ({ memberType }: { memberType: MemberType }) => {
  return (
    <>
      {memberType === MEMBER_TYPE.ARTIST && (
        <TooltipRoot message="본 페이지의 모든 지표는 본인이 참여한 트랙에 대한 수치만 반영한 값입니다." alwaysVisible>
          <Image src="/images/information.svg" alt="정보" width={22} height={22} className={cx("information")} />
        </TooltipRoot>
      )}
      <div className={cx("monthPickerDropdownContainer", { artist: memberType === MEMBER_TYPE.ARTIST })}>
        <MonthPickerDropdown />
      </div>
    </>
  );
};

export default AlbumDetailsInformationTooltip;
