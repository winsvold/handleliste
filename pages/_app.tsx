import React from "react";
import { ResetCSS } from "../styles/reset.css";
import Head from "next/head";
import { GlobalStyle } from "../styles/GlobalStyle";
import ToppLinje from "../components/ToppLinje";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <title>Handleliste</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Delius&display=swap" rel="stylesheet" />
      </Head>
      <ToppLinje />
      <ResetCSS />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
