export const MODAL_TYPE = {
  ERROR: "ERROR",
  CONFIRM: "CONFIRM",
  FORM: "FORM",
  INFO: "INFO",
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];
