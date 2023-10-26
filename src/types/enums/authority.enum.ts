export const REQUEST_AUTHORITY_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type RequestAuthorityStatus = (
  typeof REQUEST_AUTHORITY_STATUS)[keyof typeof REQUEST_AUTHORITY_STATUS];
