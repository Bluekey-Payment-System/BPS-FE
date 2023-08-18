import React from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./SearchBar.module.scss";

const cx = classNames.bind(styles);

interface SearchBarProps {
  placeholder: string,
  onClick: () => void
  theme?: "withSearchBar"
}

/**
 * @author 임병욱
 * @param {string} placeholder - 검색창에 사용될 placeholder
 * @param {string} onClick - 돋보기 아이콘을 클릭하면 실행되는 함수를 넣어주시면됩니다.
 * @param {string} theme - withSearcBar를 넣으면 오른쪽 부분만 radius 처리됩니다.
 */
const SearchBar = (
  { placeholder, onClick, theme }: SearchBarProps,
  inputRef: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className={cx("searchBarContainer", theme)}>
      <input className={cx("searchInput", theme)} ref={inputRef} placeholder={placeholder} />
      <Image src="/images/search-bar.svg" className={cx("searchImage")} alt="검색" width={13} height={15} onClick={onClick} />
    </div>
  );
};

export default React.forwardRef(SearchBar);
