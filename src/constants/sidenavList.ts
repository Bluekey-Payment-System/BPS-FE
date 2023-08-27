import { store } from "@/redux/store";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

export const SIDE_NAV_ITEMS_SUPER_ADMIN = [
  { id: 1, content: "대시보드", path: `/admin/dashboard/${getLatestYearMonthString()}` },
  { id: 2, content: "아티스트 현황", path: `/admin/artists/${getLatestYearMonthString()}` },
  { id: 3, content: "아티스트 등록", path: "/admin/artists/new" },
  { id: 4, content: "타 계정 관리", path: "/admin/manage-accounts" },
  { id: 5, content: "앨범 상세", path: "/admin/albums" },
  { id: 6, content: "앨범 등록", path: "/admin/albums/new" },
  { id: 7, content: "정산 내역 업로드", path: `/admin/upload-revenue/${getLatestYearMonthString()}` },
  { id: 8, content: "내 프로필", path: "/admin/my-profile" },
];

export const SIDE_NAV_ITEMS_ADMIN = [
  { id: 1, content: "대시보드", path: `/admin/dashboard/${getLatestYearMonthString()}` },
  { id: 2, content: "아티스트 현황", path: `/admin/artists/${getLatestYearMonthString()}` },
  { id: 3, content: "아티스트 등록", path: "/admin/artists/new" },
  { id: 4, content: "아티스트 계정 관리", path: "/admin/manage-accounts" },
  { id: 5, content: "앨범 상세", path: "/admin/albums" },
  { id: 6, content: "앨범 등록", path: "/admin/albums/new" },
  { id: 7, content: "정산 내역 업로드", path: `/admin/upload-revenue/${getLatestYearMonthString()}` },
  { id: 8, content: "내 프로필", path: "/admin/my-profile" },
];

const userId = store.getState().user.member?.memberId;

export const SIDE_NAV_ITEMS_ARTIST = [
  { id: 1, content: "대시보드", path: `/artists/${userId}/dashboard/${getLatestYearMonthString()}` },
  { id: 2, content: "앨범 탐색", path: `/artists/${userId}/albums` },
  { id: 3, content: "내 프로필", path: `/artists/${userId}/my-profile` },
];
