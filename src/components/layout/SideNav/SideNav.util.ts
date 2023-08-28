/* eslint-disable no-useless-escape */
/* eslint-disable radix */
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

const isBeforeOrCurrentYearMonth = (yearMonth: string): boolean => {
  if (!/^\d{6}$/.test(yearMonth)) {
    return false; // yyyymm 형식이 아닌 경우
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const inputYear = parseInt(yearMonth.substring(0, 4));
  const inputMonth = parseInt(yearMonth.substring(4, 6));

  if (inputYear > currentYear || (inputYear === currentYear && inputMonth > currentMonth)) {
    return false;
  }

  return true;
};

export const isActive = (currentPath: string, targetPath: string | string[]) => {
  if (Array.isArray(targetPath)) return false;

  const currentPathSegment = currentPath.split(/[\/?]/);
  const targetPathSegment = (targetPath).split(/[\/?]/);

  // 어드민 대시보드 형식 확인
  if (targetPath === `/admin/dashboard/${getLatestYearMonthString()}`) {
    if (currentPathSegment[1] === "admin" && currentPathSegment[2] === "dashboard" && isBeforeOrCurrentYearMonth(currentPathSegment[3])) {
      return true;
    }
    return false;
  }

  // 아티스트 대시보드 형식 확인
  if (targetPathSegment[1] === "artists" && targetPathSegment[3] === "dashboard") {
    if (currentPathSegment[1] === "artists" && currentPathSegment[3] === "dashboard" && isBeforeOrCurrentYearMonth(currentPathSegment[4])) {
      return true;
    }
    return false;
  }

  // 아티스트 현황 확인
  if (targetPath === `/admin/artists/${getLatestYearMonthString()}`) {
    if (currentPathSegment[1] === "admin" && currentPathSegment[2] === "artists" && isBeforeOrCurrentYearMonth(currentPathSegment[3])) {
      return true;
    }
    return false;
  }

  // 정산 내역 업로드 확인
  if (targetPath === `/admin/upload-revenue/${getLatestYearMonthString()}`) {
    if (currentPathSegment[1] === "admin" && currentPathSegment[2] === "upload-revenue" && isBeforeOrCurrentYearMonth(currentPathSegment[3])) {
      return true;
    }
    return false;
  }

  // 어드민 보는 앨범 탐색 리스트
  return currentPath === targetPath;
};

export const isAlbumExplorer = (currentPath: string, targetPath: string | string[]) => {
  const currentPathSegment = currentPath.split(/[\/?]/);

  if (Array.isArray(targetPath)) {
    for (let i = 0; i < targetPath.length; i += 1) {
      const targetPathSegment = targetPath[i].split(/[\/?]/);

      if (targetPathSegment[1] === "artists" && targetPathSegment[3] === "albums") {
        if (currentPathSegment[1] === "artists" && currentPathSegment[3] === "albums") {
          return true;
        }
      }
      if (targetPathSegment[1] === "albums") {
        if (currentPathSegment[1] === "albums" && isBeforeOrCurrentYearMonth(currentPathSegment[3])) {
          return true;
        }
      }
    }
    return currentPath === targetPath[0];
  }
  return false;
};
