import React from "react";
import { ResetCSS } from "../styles/reset.css";
import Head from "next/head";
import { GlobalStyle } from "../styles/GlobalStyle";
import ToppLinje from "../components/ToppLinje";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }: any) => {
  const { asPath } = useRouter();
  console.log(asPath);

  return (
    <>
      <Head>
        <title>Handleliste</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛒</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Delius&display=swap" rel="stylesheet" />
      </Head>
      <ResetCSS />
      {!asPath.startsWith("/studio") && (
        <>
          <ToppLinje />
          <GlobalStyle />
        </>
      )}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
