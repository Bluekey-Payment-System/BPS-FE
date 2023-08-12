import classNames from "classnames/bind";

import styles from "./MainLayout.module.scss";

const cx = classNames.bind(styles);

interface MainLayoutProps {
  title: string
  children: React.ReactNode
}

const MainLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <section className={cx("container")}>
      <h1 className={cx("title")}>{title}</h1>
      {children}
    </section>
  );
};

export default MainLayout;
