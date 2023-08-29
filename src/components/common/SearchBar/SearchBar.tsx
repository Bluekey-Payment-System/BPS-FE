import React from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./SearchBar.module.scss";

const cx = classNames.bind(styles);

interface SearchBarProps {
  placeholder: string,
  onClick: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void,
  theme?: "withSearchBar"
  value: string
}

/**
 * @author 임병욱
 * @param {string} placeholder - 검색창에 사용될 placeholder
 * @param {string} onClick - 돋보기 아이콘을 클릭하면 실행되는 함수를 넣어주시면됩니다.
 * @param {string} theme - withSearcBar를 넣으면 오른쪽 부분만 radius 처리됩니다.
 * @param {string} value - 검색바에 보여줄 검색 키워드
 * @returns 키워드를 검색할 수 있는 검색바 컴포넌트
*/
const SearchBar = (
  {
    placeholder, onClick, theme, value,
  }: SearchBarProps,
  inputRef: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className={cx("searchBarContainer", theme)}>
      <input className={cx("searchInput", theme)} ref={inputRef} defaultValue={value} placeholder={placeholder} />
      <button type="button" className={cx("searchImage")} onClick={onClick}>
        <Image src="/images/search-bar.svg" alt="검색" width={13} height={15} />
      </button>
    </div>
  );
};

export default React.forwardRef(SearchBar);
