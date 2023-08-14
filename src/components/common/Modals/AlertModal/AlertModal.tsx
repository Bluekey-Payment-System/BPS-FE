import classNames from "classnames/bind";

import { MODAL_TYPE, ModalType } from "@/types/enums/modal.enum";

import Button from "../../CommonBtns/Button/Button";
import Modal from "../Modal";

import styles from "./AlertModal.module.scss";

const cx = classNames.bind(styles);

export interface AlertModalProps {
  open: boolean;
  type: Extract<ModalType, (typeof MODAL_TYPE)["ERROR"] | (typeof MODAL_TYPE)["CONFIRM"]>;
  title: string;
  message: string;
  onClickProceed?: ()=>void;
  proceedBtnText?: string;
  closeBtnText?: string;
  onClose: () => void;
}

/**
 * 경고 모달 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param type {ModalType} 모달 유형, ERROR, CONFIRM중 하나
 * @param open {bolean} 모달의 open상태
 * @param onClose {bolean} 모달의 open상태를 close로 바꾸는 함수
 * @param title {string} 경고 모달의 title
 * @param message {string} 경고 모달의 메세지
 * @param onClickProceed {Function} CONFIRM타입의 경우, 진행 버튼의 클릭 핸들러함수
 * @param proceedBtnText {string} CONFIRM타입의 경우, 진행 버튼 텍스트
 * @param closeBtnText {string} 닫기 버튼 텍스트, 기본값은 "확인""
 * @example
 * ```tsx
 * const {isOpen, setIsOpen} = useState(false)
 * ...
 * return (
 * <>
 *  <button onClick={()=>{setIsOpen(true)}}>모달 열기 버튼</button>
 *  <AlertModal
 *   open={isOpen}
 *   type={MODAL_TYPE.ERROR}
 *   title="로그인 에러"
 *   message="로그인에 실패했습니다. 아이디/비밀번호를 다시 한번 확인해주세요."
 *   onClose={()=>{setIsOpen(false)}}
 *  />
  </>
  );
 * ```
 */
const AlertModal = ({
  open,
  type,
  title,
  message,
  onClickProceed,
  proceedBtnText,
  closeBtnText = "확인",
  onClose,
}: AlertModalProps) => {
  return (
    <Modal type={type} open={open} onClose={onClose}>
      <div className={cx("container")}>
        <div className={cx("iconBox")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
            <circle cx="29" cy="29" r="29" fill="#FFE9E9" />
            <path fillRule="evenodd" clipRule="evenodd" d="M30.5 15.75C30.5 14.7835 29.7165 14 28.75 14C27.7835 14 27 14.7835 27 15.75V33.25C27 34.2165 27.7835 35 28.75 35C29.7165 35 30.5 34.2165 30.5 33.25L30.5 15.75ZM29 44C30.1046 44 31 43.1046 31 42C31 40.8954 30.1046 40 29 40C27.8954 40 27 40.8954 27 42C27 43.1046 27.8954 44 29 44Z" fill="#FF000F" />
          </svg>
        </div>
        <h1 className={cx("title")}>{title}</h1>
        <p className={cx("message")}>{message}</p>
        <Button
          size="large"
          theme="dark"
          onClick={onClickProceed ?? onClose}
        >
          {proceedBtnText ?? closeBtnText}
        </Button>
        {onClickProceed && (
          <button className={cx("closeBtnWithProceed")} onClick={onClose}>
            {closeBtnText}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default AlertModal;
