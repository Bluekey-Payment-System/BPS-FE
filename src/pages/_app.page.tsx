import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import Head from "next/head";

import ToastRoot from "@/components/common/Toast/ToastRoot";
import wrapper from "@/redux/store";
import Pretendard from "@/styles/local.font";

const App = ({ Component, ...rest }: AppProps) => {
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Head>
        <title>블루키뮤직 정산시스템</title>
      </Head>
      <main className={Pretendard.className}>
        <Component {...rest.pageProps} />
      </main>
      <ToastRoot />
    </Provider>
  );
};
export default App;
