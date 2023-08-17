import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import classNames from "classnames/bind";

import useMountTransition from "@/hooks/useMountTransition";

import styles from "./Drawer.module.scss";

const cx = classNames.bind(styles);

interface DrawerProps {
  isOpen: boolean,
  children: React.ReactNode,
  onClose: () => void,
  className?: string,
  position?: "left" | "right" | "top" | "bottom",
  removeWhenClosed: boolean
}

const createPortalRoot = () => {
  const drawerRoot = document.createElement("div");
  drawerRoot.setAttribute("id", "drawer-root");

  return drawerRoot;
};

/**
 * 모달 드로어를 표시하는 Drawer 컴포넌트입니다.
 *
 * @component
 * @author 임병욱
 * @param {boolean} isOpen - 드로어가 열려 있는지 여부를 결정합니다.
 * @param {React.ReactNode} children - 드로어 안에 표시될 내용입니다.
 * @param {string} [className] - 드로어에 추가적인 CSS 클래스 이름입니다.
 * @param {"left" | "right" | "top" | "bottom"} [props.position="left"] - 드로어가 나타날 위치입니다.
 * @param {function} onClose - 드로어가 닫힐 때 호출될 함수입니다.
 * @param {boolean} [removeWhenClosed=true] - 드로어가 닫혔을 때 DOM에서 제거할지 여부를 결정합니다.
 *
 * @returns {React.ReactNode} Drawer 컴포넌트의 JSX 표현입니다.
 */
const Drawer = ({
  isOpen,
  children,
  className,
  position = "left",
  onClose,
  removeWhenClosed = true,
}: DrawerProps) => {
  const isTransitioning = useMountTransition(isOpen, 300);
  const bodyRef = useRef<HTMLElement | null>(null);
  const portalRootRef = useRef(document.getElementById("drawer-root") || createPortalRoot());

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (bodyRef.current) {
      const portal = portalRootRef.current;
      bodyRef.current.appendChild(portal);
      const bodyEl = bodyRef.current;

      return () => {
        portal.remove();
        bodyEl.style.overflow = "";
      };
    }
  }, []);

  useEffect(() => {
    bodyRef.current = document.body;
    const updatePageScroll = () => {
      if (bodyRef.current) {
        if (isOpen) {
          bodyRef.current.style.overflow = "hidden";
        } else {
          bodyRef.current.style.overflow = "";
        }
      }
    };
    updatePageScroll();
  }, [isOpen]);

  if (removeWhenClosed && !isOpen) {
    return null;
  }

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  return createPortal(
    <div
      aria-hidden={isOpen ? "false" : "true"}
      className={cx("drawerContainer", {
        open: isOpen,
        in: isTransitioning,
        className,
      })}
    >
      <div
        className={cx("drawer", position, className)}
        role="dialog"
      >
        {children}
      </div>
      <div className={cx("backdrop", className)} onClick={onClose} role="presentation" />
    </div>,
    portalRootRef.current,
  );
};

export default Drawer;
