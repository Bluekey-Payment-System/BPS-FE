import { useCallback, useMemo } from "react";

import { SIDE_NAV_ITEMS_SUPER_ADMIN, SIDE_NAV_ITEMS_ADMIN } from "@/constants/sidenavList";
import { MEMBER_ROLE, MemberRole } from "@/types/enums/user.enum";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

interface IUserSideNav {
  id: number;
  content: string;
  path: string | string[]
}

const userRoleToSideNavMap = {
  SUPER_ADMIN: SIDE_NAV_ITEMS_SUPER_ADMIN,
  ADMIN: SIDE_NAV_ITEMS_ADMIN,
};

const sideNavItemsArtist = (userId: number) => {
  return [
    { id: 1, content: "대시보드", path: `/artists/${userId}/dashboard/${getLatestYearMonthString()}` },
    { id: 2, content: "앨범 탐색", path: [`/artists/${userId}/albums`, `/albums/albumId/${getLatestYearMonthString()}`] },
    { id: 3, content: "내 프로필", path: `/artists/${userId}/my-profile` },
  ];
};

const useSideNavList = (memberRole: MemberRole, userId: number): IUserSideNav[] => {
  const sideNavListByRole = useCallback(
    () => {
      if (memberRole === MEMBER_ROLE.ARTIST) {
        return sideNavItemsArtist(userId);
      }
      return (userRoleToSideNavMap[memberRole]);
    },
    [userId, memberRole],
  );

  const sideNavList: IUserSideNav[] = useMemo(
    () => { return sideNavListByRole(); },
    [sideNavListByRole],
  );

  return sideNavList;
};

export default useSideNavList;
