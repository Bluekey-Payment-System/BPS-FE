import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import Head from "next/head";

import AlertModalRoot from "@/components/common/Modals/AlertModal/AlertModalRoot";
import ToastRoot from "@/components/common/Toast/ToastRoot";
import Layout from "@/components/layout/Layout";
import wrapper from "@/redux/store";
import Pretendard from "@/styles/local.font";

const App = ({ Component, ...rest }: AppProps) => {
  const { store } = wrapper.useWrappedStore(rest);

  const getContent = () => {
    if (["/admin/signin"].includes(rest.router.pathname)
      || ["/admin/signup"].includes(rest.router.pathname)
      || ["/login"].includes(rest.router.pathname)) { return <Component {...rest.pageProps} />; }

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
      <main className={Pretendard.className} style={{ minWidth: "1920px" }}>
        {getContent()}
      </main>
      <ToastRoot />
      <AlertModalRoot />
    </Provider>
  );
};
export default App;
