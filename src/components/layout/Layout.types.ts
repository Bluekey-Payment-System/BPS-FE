import { SetStateAction } from "react";

import { MemberRole } from "@/types/enums/user.enum";

export interface IUserInfo {
  role: MemberRole
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
