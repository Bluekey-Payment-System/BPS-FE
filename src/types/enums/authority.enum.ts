export const REQUEST_AUTHORITY_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  AUTO_REJECTED: "AUTO_REJECTED",
} as const;

export type RequestAuthorityStatus = (
  typeof REQUEST_AUTHORITY_STATUS)[keyof typeof REQUEST_AUTHORITY_STATUS];
