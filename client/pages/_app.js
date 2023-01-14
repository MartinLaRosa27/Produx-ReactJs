import React, { useState } from "react";
import { Header } from "../components/Header";
import Head from "next/head";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Footer } from "../components/Footer";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function App({ Component, pageProps }) {
  const [userToken, setUserToken] = useState(null);

  return (
    <>
          <Provider store={store}>
            <Head>
              <title>Produx</title>
            </Head>
            <Toaster />
            <Header userToken={userToken} />
            <Component {...pageProps} setUserToken={setUserToken} />
            <Footer />
          </Provider>
    </>
  );
}
