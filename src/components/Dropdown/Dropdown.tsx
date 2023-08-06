import { useState } from "react";
import { useQuery } from "react-query";

import DropdownUI from "./DropdownUI";

const Dropdown = (url) => {
  // const { date, isloading }: { date: string[], isLoading: boolean } = useQuery(url, fetchData);
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>("곡 명");

  return (
    <DropdownUI
      selectedDropdownValue={selectedDropdownValue}
      setSelectedDropdownValue={setSelectedDropdownValue}
      toggle={toggle}
      setToggle={setToggle}
      fetchData={["곡 명", "앨범 명"]}
    />
  );
};

export default Dropdown;
