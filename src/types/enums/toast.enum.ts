export const TOAST_STATUS = {
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
} as const;

export type ToastStatus = (typeof TOAST_STATUS)[keyof typeof TOAST_STATUS];
