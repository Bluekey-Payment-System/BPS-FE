import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import classNames from "classnames/bind";
import Head from "next/head";

import ToastRoot from "@/components/common/Toast/ToastRoot";
import Layout from "@/components/layout/Layout";
import wrapper from "@/redux/store";
import styles from "@/styles/globals.scss";
import Pretendard from "@/styles/local.font";

const cx = classNames.bind(styles);

const App = ({ Component, ...rest }: AppProps) => {
  const { store } = wrapper.useWrappedStore(rest);
  if (["/admin/signin"].includes(rest.router.pathname)
    || ["/admin/signup"].includes(rest.router.pathname)
    || ["/artist/login"].includes(rest.router.pathname)) { return <Component {...rest.pageProps} />; }

  return (
    <Provider store={store}>
      <Head>
        <title>블루키뮤직 정산시스템</title>
      </Head>
      <main className={cx(Pretendard.className, "backgroundColor")}>
        <Layout>
          <Component {...rest.pageProps} />
        </Layout>
      </main>
      <ToastRoot />
    </Provider>
  );
};
export default App;
