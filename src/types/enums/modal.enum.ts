export const MODAL_TYPE = {
  ERROR: "ERROR",
  CONFIRM: "CONFIRM",
  FORM: "FORM",
  ALBUM_INFO: "ALBUM_INFO",
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];
