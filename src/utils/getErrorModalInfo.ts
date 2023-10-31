import { IShowAlertModalParam } from "@/hooks/useAlertModal";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

/**
 * getLastSegmentFromUrl 유틸 함수
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param message {string} 모달에 띄워질 메세지 텍스트
 * @param title {string} 모달 제목 텍스트
 * @returns {IShowAlertModalParam} showAlertModal의 인자로 들어갈 객체를 반환합니다.
 * @example
 * ```ts
 * if(error) {
 *   showAlertModal(getErrorModalInfo(error.message ?? "에러가 발생했습니다", "에러제목"));
 * }
 * ```
 *  */
const getErrorModalInfo = (message: string, title: string): IShowAlertModalParam => {
  return {
    type: MODAL_TYPE.ERROR,
    title,
    message,
  };
};

export default getErrorModalInfo;
