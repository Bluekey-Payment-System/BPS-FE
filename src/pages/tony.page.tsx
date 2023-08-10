import { FormEvent } from "react";

import Dropdown from "@/components/common/Dropdown/Dropdown";

const TonyPage = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
      <Dropdown dropdownListData={["곡 명", "앨범 명"]} theme="withSearchBar" />
      <Dropdown dropdownListData={["곡 명", "앨범 명"]} />
      <Dropdown dropdownListData={["곡 명", "앨범 명"]} theme="hasSearchBar" hasSearchBar />
      <Dropdown dropdownListData={["곡 명", "앨범 명"]} theme="dark" />
    </form>
  );
};

export default TonyPage;
