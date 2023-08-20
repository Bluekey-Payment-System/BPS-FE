export const DASHBOARD_TYPE = {
  ADMIN: "ADMIN",
  ARTIST: "ARTIST",
  ALBUM: "ALBUM",
} as const;

export type DashboardType = (typeof DASHBOARD_TYPE)[keyof typeof DASHBOARD_TYPE];
export type AdminDashboardType = (typeof DASHBOARD_TYPE)["ADMIN"];
export type ArtistDashboardType = (typeof DASHBOARD_TYPE)["ARTIST"];
export type AlbumDashboardType = (typeof DASHBOARD_TYPE)["ALBUM"];
