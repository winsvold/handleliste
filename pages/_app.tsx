import React from "react";
import { ResetCSS } from "../styles/reset.css";
import Head from "next/head";
import { GlobalStyle } from "../styles/GlobalStyle";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <ResetCSS />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
