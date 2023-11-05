import { IFilterOptions } from "@/components/common/Filter/Filter.type";
import { ITEMS_PER_DASHBOARD_TABLE } from "@/constants/pagination";
import { getAdminDashboardTable } from "@/services/api/requests/admin/admin.get.api";
import { getArtistDashboardTable } from "@/services/api/requests/artist/artist.get.api";
import { AdminDashboardType, ArtistDashboardType, DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

export const getDashboardTable = async (
  type: AdminDashboardType | ArtistDashboardType,
  month: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
  filterOptions: IFilterOptions,
  artistId?: number,
) => {
  const data = (type === DASHBOARD_TYPE.ADMIN)
    ? await getAdminDashboardTable(
      month,
      page,
      ITEMS_PER_DASHBOARD_TABLE,
      sortBy,
      searchBy,
      keyword,
      filterOptions,
    )
    : await getArtistDashboardTable(
      month,
      page,
      ITEMS_PER_DASHBOARD_TABLE,
      sortBy,
      searchBy,
      keyword,
      filterOptions,
      artistId!,
    );
  return data;
};
