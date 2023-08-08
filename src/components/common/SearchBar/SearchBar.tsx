import React from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./SearchBar.module.scss";

const cx = classNames.bind(styles);

const SearchBar = (
  { placeholder }: { placeholder: string },
  inputRef: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className={cx("searchBarContainer")}>
      <input className={cx("searchInput")} ref={inputRef} placeholder={placeholder} />
      <Image src="/images/search-bar.svg" className={cx("searchImage")} alt="검색" width={13} height={15} />
    </div>
  );
};

export default React.forwardRef(SearchBar);
