import { AlertModalProps } from "@/components/common/Modals/AlertModal/AlertModal";
import { useAppDispatch } from "@/redux/hooks";
import { setShow, setProps } from "@/redux/slices/alertModalSlice";

export interface IShowAlertModalParam extends Omit<AlertModalProps, "open" | "onClose"> {
  onClose?: () => void;
}
/**
 * 경고 모달 렌더링을 전역 상태를 이용하여 추상화한 훅
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param params {IUserAlertModalParam} - AlertModalProps 타입에 open, onClose를 제외한 타입
 * @example
 * ```tsx
 * const alertModalProps = {
 *   type: MODAL_TYPE.ERROR,
 *   title: "로그인 에러",
 *   message: "로그인에 실패했습니다. 아이디/비밀번호를 다시 한번 확인해주세요.",
 *   onClose: ()=>{setIsOpen(false)}, // 옵셔널
 * }
 * const {showAlertModal} = useAlertModal(alertModalProps);
 * ...
 * return (
 * <>
 *  <button onClick={()=>{showAlertModal()}}>경고 모달 열기</button>
  </>
  );
 * ```
 */
const useAlertModal = () => {
  const dispatch = useAppDispatch();

  const showAlertModal = (params: IShowAlertModalParam) => {
    dispatch(setProps(params));
    dispatch(setShow(true));
  };

  return { showAlertModal };
};

export default useAlertModal;
