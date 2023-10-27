import { RequestAuthorityStatus } from "./authority.enum";

export const MEMBER_ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  ARTIST: "ARTIST",
} as const;

export type MemberRole = (typeof MEMBER_ROLE)[keyof typeof MEMBER_ROLE];
export type SuperAdminRole = (typeof MEMBER_ROLE)["SUPER_ADMIN"];
export type AdminRole = (typeof MEMBER_ROLE)["ADMIN" | "SUPER_ADMIN"] | Omit<RequestAuthorityStatus, "APPROVED">;
export type ArtistRole = (typeof MEMBER_ROLE)["ARTIST"];
export type UserRole = MemberRole & Omit<RequestAuthorityStatus, "APPROVED">;

export const MEMBER_TYPE = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export type MemberType = (typeof MEMBER_TYPE)[keyof typeof MEMBER_TYPE];
export type AdminType = (typeof MEMBER_TYPE)["ADMIN"];
export type UserType = (typeof MEMBER_TYPE)["USER"];
