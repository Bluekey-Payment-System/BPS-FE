import {
  Html, Head, Main, NextScript,
} from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="tooltip-root" />
      </body>
    </Html>
  );
};

export default Document;
