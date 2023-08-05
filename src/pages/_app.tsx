import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
};
export default App;
