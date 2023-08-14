import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import classNames from "classnames/bind";
import Head from "next/head";

import ToastRoot from "@/components/common/Toast/ToastRoot";
import wrapper from "@/redux/store";
import Pretendard from "@/styles/local.font";

// eslint-disable-next-line import/order
import styles from "./_app.page.module.scss";

// eslint-disable-next-line import/order
import Layout from "@/components/layout/Layout";

const cx = classNames.bind(styles);

const App = ({ Component, ...rest }: AppProps) => {
  const { store } = wrapper.useWrappedStore(rest);

  const getContent = () => {
    if (["/admin/signin"].includes(rest.router.pathname)
      || ["/admin/signup"].includes(rest.router.pathname)
      || ["/artist/login"].includes(rest.router.pathname)) { return <Component {...rest.pageProps} />; }

    return (
      <Layout>
        <Component {...rest.pageProps} />
      </Layout>
    );
  };

  return (
    <Provider store={store}>
      <Head>
        <title>블루키뮤직 정산시스템</title>
      </Head>
      <main className={cx(Pretendard.className, "backgroundColor")}>
        {getContent()}
      </main>
      <ToastRoot />
    </Provider>
  );
};
export default App;
