export const MEMBER_TYPE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  ARTIST: "ARTIST",
} as const;

export type MemberType = (typeof MEMBER_TYPE)[keyof typeof MEMBER_TYPE];
export type SuperAdminType = (typeof MEMBER_TYPE)["SUPER_ADMIN"];
export type AdminType = (typeof MEMBER_TYPE)["ADMIN" | "SUPER_ADMIN"];
export type ArtistType = (typeof MEMBER_TYPE)["ARTIST"];
