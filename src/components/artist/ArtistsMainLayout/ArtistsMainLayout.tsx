import classNames from "classnames/bind";

import styles from "./ArtistsMainLayout.module.scss";

interface ArtistsMainLayoutProps {
  title: string
  dropdownElement: React.ReactNode
  searchBarElement: React.ReactNode
  children: React.ReactNode
}

const cx = classNames.bind(styles);

const ArtistsMainLayout = ({
  title, dropdownElement, searchBarElement, children,
}: ArtistsMainLayoutProps) => {
  return (
    <section className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("titleWithDropdown")}>
          <h1 className={cx("title")}>{title}</h1>
          {dropdownElement}
        </div>
        {searchBarElement}
      </div>
      {children}
    </section>
  );
};

export default ArtistsMainLayout;
