import {
  ForwardedRef, forwardRef, useEffect, useState,
} from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./Toast.module.scss";

const cx = classNames.bind(styles);

/**
 * 토스트 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param {string } message - 토스트 메세지
 * @example
 *
 * ```
 * <ToastPortal>
 *   <Toast message="완료되었습니다" />
 * </ToastPortal>
 *```
 */
const Toast = forwardRef(
  (
    { message }: { message: string },
    ref: ForwardedRef<HTMLDialogElement>,
  ) => {
    const [isShowing, setIsShowing] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsShowing(false);
      }, 2800);

      return () => { return clearTimeout(timeout); };
    }, []);

    return (
      <dialog
        ref={ref}
        open
      >
        <div className={cx("toastContainer", {
          fadeIn: isShowing,
          fadeOut: !isShowing,
        })}
        >
          <div className={cx("iconBox")}>
            <Image src="/images/lightening.png" alt="번개 아이콘" sizes="64vw" fill />
          </div>
          <span>{message}</span>
        </div>
      </dialog>
    );
  },
);

export default Toast;
