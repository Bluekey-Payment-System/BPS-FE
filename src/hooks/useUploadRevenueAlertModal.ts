import { UploadRevenueAlertModalProps } from "@/components/upload-revenue/UploadRevenueAlertModal/UploadRevenueAlertModal";
import { useAppDispatch } from "@/redux/hooks";
import { setShow, setProps } from "@/redux/slices/uploadRevenueAlertModalSlice";

export interface IShowUploadRevenueAlertModalParam extends Omit<UploadRevenueAlertModalProps, "open" | "onClose"> {
  onClose?: () => void;
}

/**
 * 정산 내역 등록 시, warning / error 경고 모달을 추상화한 훅
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param params {IShowUploadRevenueAlertModalParam}
 * @example
 * ```tsx
 * const uploadRevenueAlertModalProps = {
 *   type: "warning",
 *   alertData: [...],
 *   onClose: () => { ... }, // 옵셔널(추가적인 작업 필요 시)
 * }
 * const {showUploadRevenueAlertModal} = useUploadRevenueAlertModal();
 * ...
 * return (
 * <>
 *  <button onClick={()=>{showUploadRevenueAlertModal({
 *   type: "warning",
 *   alertData: [...],
 *   onClose: () => { ... }, // 옵셔널(추가적인 작업 필요 시)
 *   }
 *  )}}>경고 모달 열기</button>
 * </>
 * );
 * ```
 */
const useUploadRevenueAlertModal = () => {
  const dispatch = useAppDispatch();

  const showUploadRevenueAlertModal = (params: IShowUploadRevenueAlertModalParam) => {
    dispatch(setProps(params));
    dispatch(setShow(true));
  };

  return { showUploadRevenueAlertModal };
};

export default useUploadRevenueAlertModal;
