import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import classNames from "classnames/bind";

import useMountTransition from "@/hooks/useMountTransition";

import styles from "./Drawer.module.scss";

const cx = classNames.bind(styles);

interface DrawerProps {
  isOpen: boolean,
  children: React.ReactNode,
  className: string,
  onClose: () => void,
  position: "left" | "right" | "top" | "bottom",
  removeWhenClosed: boolean
}

const createPortalRoot = () => {
  const drawerRoot = document.createElement("div");
  drawerRoot.setAttribute("id", "drawer-root");

  return drawerRoot;
};

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
        className={cx("drawer", position)}
        role="dialog"
      >
        {children}
      </div>
      <div className={cx("backdrop")} onClick={onClose} role="presentation" />
    </div>,
    portalRootRef.current,
  );
};

export default Drawer;
