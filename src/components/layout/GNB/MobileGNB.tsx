import classNames from "classnames/bind";

import styles from "./MobileGNB.module.scss";

interface MobileGNBProps {
  profileImage: string | null,
  type: "SUPER_ADMIN" | "ADMIN" | "ARTIST"
  onClickNotification: () => void,
  onClickLogout: () => void,
}

const cx = classNames.bind(styles);

const MobileGNB = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  profileImage, type, onClickNotification, onClickLogout,
}: MobileGNBProps) => {
  return (
    <div className={cx("container")}>
      <div>{profileImage}</div>
      <div>{type}</div>
    </div>
  );
};

export default MobileGNB;
