import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import { useState } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

import {
  Hydrate, QueryClient, QueryClientProvider, type DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

import AlertModalRoot from "@/components/common/Modals/AlertModal/AlertModalRoot";
import ToastRoot from "@/components/common/Toast/ToastRoot";
import AuthPageLayout from "@/components/layout/AuthPageLayout";
import Layout from "@/components/layout/Layout";
import wrapper from "@/redux/store";
import Pretendard from "@/styles/local.font";

const App = ({ Component, ...rest }: AppProps<{ dehydratedState: DehydratedState }>) => {
  const { store } = wrapper.useWrappedStore(rest);
  const [queryClient] = useState(() => {
    return new QueryClient(
      {
        defaultOptions: {
          queries: {
            staleTime: 900000,
            cacheTime: 900000,
          },
        },
      },
    );
  });

  const getContent = () => {
    if (["/admin/signin"].includes(rest.router.pathname)
      || ["/admin/signup"].includes(rest.router.pathname)
      || ["/signin"].includes(rest.router.pathname)) { return <AuthPageLayout><Component {...rest.pageProps} /></AuthPageLayout>; }

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
          <CookiesProvider>
            <Head>
              <title>블루키뮤직 정산시스템</title>
            </Head>
            <main className={Pretendard.className}>
              {getContent()}
            </main>
            <ToastRoot />
            <AlertModalRoot />
          </CookiesProvider>
        </Provider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
