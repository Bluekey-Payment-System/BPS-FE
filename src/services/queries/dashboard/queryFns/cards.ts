/* eslint-disable @typescript-eslint/no-unused-vars */
import { DashboardCardProps } from "@/components/common/DashboardCard/DashboardCard.type";
import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";
import { getAdminDashboardCards } from "@/services/api/requests/admin/admin.get.api";
import { getAlbumDashboardCards } from "@/services/api/requests/albums/albums.get.api";
import { getArtistDashboardCards } from "@/services/api/requests/artist/artist.get.api";
import { DASHBOARD_TYPE, DashboardType } from "@/types/enums/dashboard.enum";
import { MemberRole } from "@/types/enums/user.enum";
import formatMoney from "@/utils/formatMoney";

export const getDashboardCards = async (
  type: DashboardType,
  month: string,
  artistId?: number,
  albumId?: number,
  memberRole?: MemberRole,
) => {
  const formattedMonth = convertToYearMonthFormat(month);
  let response;
  let artistName = "";
  let albumName = "";
  let cards: DashboardCardProps[];
  if (type === DASHBOARD_TYPE.ADMIN) {
    response = await getAdminDashboardCards(month);
    const {
      revenue, settlementAmount, bestArtist, netIncome,
    } = response;
    cards = [{
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
      title: `${formattedMonth}의 아티스트`,
      content: bestArtist?.name ?? null,
      growthRate: bestArtist?.growthRate ?? null,
    }];
  } else if (type === DASHBOARD_TYPE.ARTIST) {
    response = await getArtistDashboardCards(month, artistId!);
    const {
      bestAlbum, bestTrack, settlementAmount, name,
    } = response;
    artistName = name;
    cards = [{
      title: "당월 정산액",
      content: formatMoney(settlementAmount.totalAmount, "card"),
      growthRate: settlementAmount.growthRate,
    },
    {
      title: `${formattedMonth}의 앨범`,
      content: bestAlbum?.name ?? null,
      growthRate: bestAlbum?.growthRate ?? null,
    },
    {
      title: `${formattedMonth}의 트랙`,
      content: bestTrack?.name ?? null,
      growthRate: bestTrack?.growthRate ?? null,
    }];
  } else {
    response = await getAlbumDashboardCards(month, albumId!);
    const {
      revenue, netIncome, settlementAmount, bestTrack, name,
    } = response;
    albumName = name;
    if (memberRole === "ARTIST") {
      cards = [{
        title: "이 앨범의 당월 정산액",
        content: formatMoney(settlementAmount.totalAmount, "card"),
        growthRate: settlementAmount.growthRate,
      },
      {
        title: `${formattedMonth}의 트랙`,
        content: bestTrack?.name ?? null,
        growthRate: bestTrack?.growthRate ?? null,
      }];
    } else {
      cards = [{
        title: "이 앨범의 당월 매출액",
        content: formatMoney(revenue.totalAmount, "card"),
        growthRate: revenue.growthRate,
      },
      {
        title: "이 앨범의 당월 회사이익",
        content: formatMoney(netIncome.totalAmount, "card"),
        growthRate: netIncome.growthRate,
      },
      {
        title: "이 앨범의 당월 정산액",
        content: formatMoney(settlementAmount.totalAmount, "card"),
        growthRate: settlementAmount.growthRate,
      },
      {
        title: `${formattedMonth}의 트랙`,
        content: bestTrack?.name ?? null,
        growthRate: bestTrack?.growthRate ?? null,
      }];
    }
  }

  return { cards, artistName, albumName };
};
