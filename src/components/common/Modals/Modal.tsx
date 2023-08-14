/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  DialogHTMLAttributes, MouseEventHandler, ReactNode, useEffect, useRef,
} from "react";

import classNames from "classnames/bind";

import { MODAL_TYPE, ModalType } from "@/types/enums/modal.enum";

import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

const MODAL_TYPE_CLASSNAME_MAP = {
  [MODAL_TYPE.ERROR]: "error",
  [MODAL_TYPE.CONFIRM]: "confirm",
  [MODAL_TYPE.FORM]: "form",
};

interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  type: ModalType;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}
/**
 * 모달 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param type {ModalType} 모달 유형, ERROR, CONFIRM, FORM 세 가지 중 하나
 * @param open {bolean} 모달의 open상태
 * @param onClose {bolean} 모달의 open상태를 close로 바꾸는 함수
 * @example
 * ```tsx
 * const {isOpen, setIsOpen} = useState(false)
 * ...
 * return (
 * <>
 *  <button onClick={()=>{setIsOpen(true)}}>모달 열기 버튼</button>
 *  <Modal type="ERROR" open={isOpen} onClose={()=>{setIsOpen(false)}}>
      <div>비밀번호 변경</div>
      <p>비밀번호 변경 모달입니다.</p>
      <button onClick={()=>{setIsOpen(false)}}>닫기</button>
    </Modal>
  </>
  );
 * ```
 */
const Modal = ({
  type, open, onClose, children, ...props
}: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleAnimationEnd = () => {
    if (!open) modalRef.current?.close();
  };

  const handleClick:MouseEventHandler<HTMLDialogElement> = ({ target }) => {
    if (target === modalRef.current) onClose();
  };

  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [open]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      style={{ background: "transparent" }}
      className={cx("dialog", { closing: !open })}
      ref={modalRef}
      onClose={onClose}
      onCancel={onClose}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      <div className={cx("container", [MODAL_TYPE_CLASSNAME_MAP[type]])}>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
