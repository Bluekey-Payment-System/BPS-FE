import { useEffect, useState } from "react";

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
const Toast = ({ message }: { message: string }) => {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowing(false);
    }, 2800);

    return () => { return clearTimeout(timeout); };
  }, []);

  return (
    <div
      className={
          cx(styles.toastContainer, {
            [styles.fadeIn]: isShowing,
            [styles.fadeOut]: !isShowing,
          })
        }
    >
      <div className={cx(styles.iconBox)}>
        <Image src="/images/lightening.png" alt="번개 아이콘" sizes="64vw" fill />
      </div>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
