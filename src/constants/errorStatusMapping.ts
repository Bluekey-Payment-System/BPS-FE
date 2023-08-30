export const UPLOAD_REVENUE_ERROR_STATUS_MAPPER = {
  NETWORK_ERROR: {
    title: "네트워크 요청 실패",
    message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
  TR_002: {
    title: "업로드 실패",
    message: "정산 내역이 이미 존재합니다.",
  },
  TR_004: {
    title: "파일 포맷 오류",
    message: "엑셀 파일의 포맷을 다시 확인하고 업로드해주세요.",
  },
  403: {
    title: "업로드 권한 없음",
    message: "엑셀 파일 업로드 권한이 없습니다. 관리자에게 문의하세요.",
  },
  500: {
    title: "업로드 실패",
    message: "서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
  DEFAULT: {
    title: "알 수 없는 에러",
    message: "알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
};
