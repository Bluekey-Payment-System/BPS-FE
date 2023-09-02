import { useEffect, useState } from "react";

import classNames from "classnames/bind";

import { ToastStatus } from "@/types/enums/toast.enum";

import styles from "./Toast.module.scss";

const cx = classNames.bind(styles);

/**
 * 토스트 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param {string } message - 토스트 메세지
 * @param {ToastStatus} status - 토스트 상태 - SUCCESS(초록색 바), FAIL(빨간색 바))
 * @example
 *
 * ```
 * <ToastPortal>
 *   <Toast message="완료되었습니다" status="SUCCESS" />
 * </ToastPortal>
 *```
 */
interface ToastProps {
  message: string;
  status: ToastStatus
}

const Toast = ({ message, status }: ToastProps) => {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowing(false);
    }, 2800);

    return () => { return clearTimeout(timeout); };
  }, []);

  return (
    <div className={cx("toastContainer", {
      fadeIn: isShowing,
      fadeOut: !isShowing,
    })}
    >
      <div className={cx("statusBar", { success: status === "SUCCESS" }, { fail: status === "FAIL" })} />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
