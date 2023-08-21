import getParentPathFromUrl from "@/utils/getParentPathFromUrl";

const getHeaderText = (currentPath: string | null) => {
  if (currentPath === "/admin/dashboard") {
    return "당월 Top 5 아티스트 매출 비중";
  }
  // '/dashboard' 또는 '/albums/{albumId}'인 경우
  return "당월 Top 5 트랙 매출 비중";
};

const routeBasedOnPath = (currentPath: string) => {
  const headerText = getHeaderText(getParentPathFromUrl(currentPath));
  return headerText;
};

export default routeBasedOnPath;
