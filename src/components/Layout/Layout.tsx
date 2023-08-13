import GNB from "./GNB/GNB";
import SideNav from "./SideNav/SideNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GNB />
      <main>{children}</main>
      <SideNav />
    </>
  );
};

export default Layout;
