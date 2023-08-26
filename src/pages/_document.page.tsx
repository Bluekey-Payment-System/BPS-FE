import {
  Html, Head, Main, NextScript,
} from "next/document";

import Pretendard from "@/styles/local.font";

const Document = () => {
  return (
    <Html lang="ko">
      <Head />
      <body className={Pretendard.className}>
        <Main />
        <NextScript />
        <div id="tooltip-root" />
        <div id="toast-root" />
      </body>
    </Html>
  );
};

export default Document;
