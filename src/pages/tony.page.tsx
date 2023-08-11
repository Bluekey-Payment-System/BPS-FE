import { useState } from "react";

import Dropdown from "@/components/common/Dropdown/Dropdown";

const TonyPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState("");
  return (
    <div style={{ display: "flex" }}>
      <Dropdown dropdownListData={["아이유", "볼빨간 사춘기", "성시경"]} theme="dark" hasSearchBar />
    </div>
  );
};

export default TonyPage;
