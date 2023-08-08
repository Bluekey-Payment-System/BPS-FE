import { FormEvent, useRef, useState } from "react";

import Dropdown from "@/components/common/Dropdown/Dropdown";
import SearchBar from "@/components/common/SearchBar/SearchBar";

const TonyPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownValue, setDropdownValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(dropdownValue, inputRef.current.value);
  };

  const onSubmitDropdownData = (selectedDropdownValue) => {
    setDropdownValue(selectedDropdownValue);
  };

  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
      <Dropdown dropdownListData={["곡 명", "앨범 명"]} onSubmitDropdownData={onSubmitDropdownData} theme="withSearchBar" />
      <SearchBar placeholder="앨범명을 검색해주세요." ref={inputRef} />
    </form>
  );
};

export default TonyPage;
