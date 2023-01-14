import React, { useEffect } from "react";
import Head from "next/head";
import * as cookie from "cookie";
import { Product } from "../components/home/Product";
import { auth } from "../middleware/auth";

export default function Home({ token, setUserToken }) {
  useEffect(() => {
    setUserToken(token);
  }, []);

  return (
    <>
      <Head>
        <title>ProduxV2 - Home</title>
      </Head>
      <main>
        <Product token={token} />
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  let token;
  if (typeof context.req.headers.cookie !== "string") {
    token = "Invalid token";
  } else {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    token = parsedCookies.token;
  }
  if (!(await auth(token))) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
    },
  };
};
