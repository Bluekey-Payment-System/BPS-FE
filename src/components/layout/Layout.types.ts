import { SetStateAction } from "react";

import { MemberType } from "@/types/enums/user.enum";

export interface IUserInfo {
  type: MemberType
}

export interface GnbInfoProps extends IUserInfo {
  loginId: string,
  profileImage: string | null,
  onClickMenu: (isOpen: boolean) => void,
}

export interface SideNavProps extends IUserInfo {
  isOpen: boolean,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>,
}
