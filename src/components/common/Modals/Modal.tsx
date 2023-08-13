/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  DialogHTMLAttributes, MouseEventHandler, ReactNode, useEffect, useRef,
} from "react";

import classNames from "classnames/bind";

import { ModalType } from "@/types/enums/modal.enum";

import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  type: ModalType;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({
  type, open, onClose, children, ...props
}: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleAnimationEnd = () => {
    if (!open) modalRef.current?.close();
  };

  const handleClick:MouseEventHandler<HTMLDialogElement> = ({ target }) => {
    // console.log(target);
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
      <div className={cx("container", [type.toLowerCase()])}>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
