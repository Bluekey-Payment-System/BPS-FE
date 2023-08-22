import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

export const isActive = (currentPath: string, targetPath: string) => {
  const segments = currentPath.split("/");
  if (targetPath === `/admin/dashboard/${getLatestYearMonthString()}`) {
    if (segments[1] === "admin" && segments[2] === "dashboard") {
      return true;
    } return false;
  }
  return currentPath === targetPath;
};
