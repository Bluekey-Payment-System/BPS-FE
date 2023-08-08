import {
  Html, Head, Main, NextScript,
} from "next/document";

const Document = () => {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="tooltip-root" />
        <div id="toast-root" />
      </body>
    </Html>
  );
};

export default Document;
