/* eslint-disable no-useless-escape */
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";
import isFormatYearMonth from "@/utils/isFormatYearMonth";

export const isActive = (currentPath: string, targetPath: string | string[]) => {
  if (Array.isArray(targetPath)) return false;

  const currentPathSegment = currentPath.split(/[\/?]/);
  const targetPathSegment = (targetPath).split(/[\/?]/);

  // 어드민 대시보드 형식 확인
  if (targetPath === `/admin/dashboard/${getLatestYearMonthString()}`) {
    if (currentPathSegment[1] === "admin" && currentPathSegment[2] === "dashboard" && isFormatYearMonth(currentPathSegment[3])) {
      return true;
    }
    return false;
  }

  // 아티스트 대시보드 형식 확인
  if (targetPathSegment[1] === "artists" && targetPathSegment[3] === "dashboard") {
    if (currentPathSegment[1] === "artists" && currentPathSegment[3] === "dashboard" && isFormatYearMonth(currentPathSegment[4])) {
      return true;
    }
    return false;
  }

  // 아티스트 현황 확인
  if (targetPath === `/admin/artists/${getLatestYearMonthString()}`) {
    if (currentPathSegment[1] === "admin" && currentPathSegment[2] === "artists" && isFormatYearMonth(currentPathSegment[3])) {
      return true;
    }
    return false;
  }

  // 정산 내역 업로드 확인
  if (targetPath === `/admin/upload-revenue/${getLatestYearMonthString()}`) {
    if (currentPathSegment[1] === "admin" && currentPathSegment[2] === "upload-revenue" && isFormatYearMonth(currentPathSegment[3])) {
      return true;
    }
    return false;
  }

  // 아티스트 내 프로필 확인
  if (targetPathSegment[1] === "artists" && targetPathSegment[3] === "my-profile") {
    if (currentPathSegment[1] === "artists" && currentPathSegment[3] === "my-profile") {
      return true;
    }
    return false;
  }

  // 나머지
  return currentPath.split("?")[0] === targetPath;
};

export const isAlbumExplorer = (currentPath: string, targetPath: string | string[]) => {
  const currentPathSegment = currentPath.split(/[\/?]/);

  if (Array.isArray(targetPath)) {
    for (let i = 0; i < targetPath.length; i += 1) {
      const targetPathSegment = targetPath[i].split(/[\/?]/);

      // 아티스트가 보는 앨범 탐색
      if (targetPathSegment[1] === "artists" && targetPathSegment[3] === "albums") {
        if (currentPathSegment[1] === "artists" && currentPathSegment[3] === "albums") {
          return true;
        }
      }

      // 어드민과 아티스트가 보는 앨범 탐색
      if (targetPathSegment[1] === "albums") {
        if (currentPathSegment[1] === "albums" && isFormatYearMonth(currentPathSegment[3])) {
          return true;
        }
      }

      // 어드민이 보는 앨범 탐색 수정
      if (targetPathSegment[1] === "admin" && targetPathSegment[2] === "albums" && targetPathSegment[4] === "edit") {
        if (currentPathSegment[1] === "admin" && currentPathSegment[2] === "albums" && currentPathSegment[4] === "edit") {
          return true;
        }
      }
    }

    // 어드민이 보는 앨범 탐색
    return currentPath === targetPath[0];
  }
  return false;
};
