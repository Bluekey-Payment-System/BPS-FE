import { useState } from "react";

import GNB from "./GNB/GNB";
import SideNav from "./SideNav/SideNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <GNB />
      <div style={{ display: "flex" }}>
        <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
      </div>
    </>
  );
};

export default Layout;
