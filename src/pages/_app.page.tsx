import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import { useState } from "react";
import { Provider } from "react-redux";

import {
  Hydrate, QueryClient, QueryClientProvider, type DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

import AlertModalRoot from "@/components/common/Modals/AlertModal/AlertModalRoot";
import ToastRoot from "@/components/common/Toast/ToastRoot";
import Layout from "@/components/layout/Layout";
import wrapper from "@/redux/store";
import Pretendard from "@/styles/local.font";

const App = ({ Component, ...rest }: AppProps<{ dehydratedState: DehydratedState }>) => {
  const { store } = wrapper.useWrappedStore(rest);
  const [queryClient] = useState(() => { return new QueryClient(); });

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
    <QueryClientProvider client={queryClient}>
      <Hydrate state={rest.pageProps.dehydratedState}>
        <Provider store={store}>
          <Head>
            <title>블루키뮤직 정산시스템</title>
          </Head>
          <main className={Pretendard.className} style={{ width: "1920px" }}>
            {getContent()}
          </main>
          <ToastRoot />
          <AlertModalRoot />
        </Provider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
