import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import { store } from "@/redux/store";
import Pretendard from "@/styles/local.font";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <main className={Pretendard.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
};
export default App;
