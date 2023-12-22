import { MemberRole } from "@/types/enums/user.enum";
import getParentPathFromUrl from "@/utils/getParentPathFromUrl";

const getHeaderText = (currentPath: string, type: MemberRole) => {
  const parentPath = getParentPathFromUrl(currentPath);

  if (parentPath === "/admin/dashboard") {
    return "당월 Top 5 아티스트 매출 비중";
  }

  if (type === "ARTIST") {
    return "당월 Top 5 트랙 정산 비중";
  }
  // '/dashboard' 또는 '/albums/{albumId}'인 경우
  return "당월 Top 5 트랙 매출 비중";
};

export default getHeaderText;
