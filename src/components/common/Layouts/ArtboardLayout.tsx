import classNames from "classnames/bind";

import styles from "./ArtboardLayout.module.scss";

const cx = classNames.bind(styles);

const ArtboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cx("board")}>
      {children}
    </div>
  );
};

export default ArtboardLayout;
