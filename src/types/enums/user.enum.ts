const MEMBER_TYPE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  ARTIST: "ARTIST",
} as const;

export type MemberType = (typeof MEMBER_TYPE)[keyof typeof MEMBER_TYPE];
