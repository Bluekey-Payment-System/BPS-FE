/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";

import { DashboardCardProps } from "@/components/common/DashboardCard/DashboardCard.type";
import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";
import { MOCK_ADMIN_DASHBOARD_CARD, MOCK_ALBUM_DASHBOARD_CARD, MOCK_ARTIST_DASHBOARD_CARD } from "@/constants/mock";
import { IGetAdminDashboardResponse } from "@/services/api/types/admin";
import { IGetAlbumDashboardResponse } from "@/services/api/types/albums";
import { IGetArtistDashboardResponse } from "@/services/api/types/artist";
import { DASHBOARD_TYPE, DashboardType } from "@/types/enums/dashboard.enum";
import formatMoney from "@/utils/formatMoney";

const getAdminDashboardCards = (yearMonth: string): Promise<IGetAdminDashboardResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ADMIN_DASHBOARD_CARD);
    }, 2000);
  });
};

const getArtistDashboardCards = (yearMonth: string): Promise<IGetArtistDashboardResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ARTIST_DASHBOARD_CARD);
    }, 2000);
  });
};

const getAlbumDashboardCards = (yearMonth: string): Promise<IGetAlbumDashboardResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ALBUM_DASHBOARD_CARD);
    }, 2000);
  });
};

export const getDashboardCards = async (type: DashboardType, yearMonth: string) => {
  const yearMonthStr = convertToYearMonthFormat(yearMonth);
  let response;
  let data: DashboardCardProps[];
  if (type === DASHBOARD_TYPE.ADMIN) {
    response = await getAdminDashboardCards(yearMonth);
    const {
      revenue, settlementAmount, bestArtist, netIncome,
    } = response;
    data = [{
      title: "당월 총 매출액",
      content: formatMoney(revenue.totalAmount, "card"),
      growthRate: revenue.growthRate,
    },
    {
      title: "당월 회사 이익",
      content: formatMoney(netIncome.totalAmount, "card"),
      growthRate: netIncome.growthRate,
    },
    {
      title: "당월 총 정산액",
      content: formatMoney(settlementAmount.totalAmount, "card"),
      growthRate: settlementAmount.growthRate,
    },
    {
      title: `${yearMonthStr}의 아티스트`,
      content: bestArtist.koArtistName,
      growthRate: bestArtist.growthRate,
    }];
  } else if (type === DASHBOARD_TYPE.ARTIST) {
    response = await getArtistDashboardCards(yearMonth);
    const { bestAlbum, bestTrack, settlement } = response;
    data = [{
      title: "당월 정산액",
      content: formatMoney(settlement.totalAmount, "card"),
      growthRate: settlement.growthRate,
    },
    {
      title: `${yearMonthStr}의 앨범`,
      content: bestAlbum.koAlbumName,
      growthRate: bestAlbum.growthRate,
    },
    {
      title: `${yearMonthStr}의 트랙`,
      content: bestTrack.koTrackName,
      growthRate: bestTrack.growthRate,
    }];
  } else {
    response = await getAlbumDashboardCards(yearMonth);
    const { settlement, bestTrack } = response;
    data = [{
      title: "이 앨범의 당월 정산액",
      content: formatMoney(settlement.totalAmount, "card"),
      growthRate: settlement.growthRate,
    },
    {
      title: `${yearMonthStr}의 트랙`,
      content: bestTrack.koTrackName,
      growthRate: bestTrack.growthRate,
    }];
  }

  return data;
};

const useDashboardCards = (type: DashboardType, yearMonth: string) => {
  const { data: cardsData, isError, isLoading } = useQuery(
    [type, "dashboard", "card"],
    () => { return getDashboardCards(type, yearMonth); },
    {
      staleTime: 5000,
    },
  );

  return ({
    cardsData, isLoading, isError,
  });
};

export default useDashboardCards;
