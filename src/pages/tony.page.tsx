import { FormEvent, useRef } from "react";

import Dropdown from "@/components/common/Dropdown/Dropdown";
import SearchBar from "@/components/common/SearchBar/SearchBar";

const TonyPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
      <Dropdown dropdownListData={["곡 명", "앨범 명"]} hasSearchBar />
      <Dropdown dropdownListData={["곡 명", "앨범 명"]} />
      <Dropdown dropdownListData={["곡 명", "앨범 명"]} theme="hasSearchBar" hasSearchBar />
      <Dropdown dropdownListData={["곡 명", "앨범 명"]} theme="dark" />
      {/* <SearchBar placeholder="앨범명을 검색해주세요." ref={inputRef} /> */}
    </form>
  );
};

export default TonyPage;
