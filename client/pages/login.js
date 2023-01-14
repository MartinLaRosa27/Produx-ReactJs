import React, { useEffect } from "react";
import Head from "next/head";
import * as cookie from "cookie";
import { LoginForm } from "../components/login/LoginForm";
import { SigninForm } from "../components/login/SigninForm";
import { auth } from "../middleware/auth";

export default function Login({ setUserToken }) {
  useEffect(() => {
    setUserToken(null);
  }, []);

  return (
    <div className="mt-5 container">
      <Head>
        <title>Welcome to Produx</title>
      </Head>
      <div className="text-center mt-5 mb-5">
        <h3>If you already have an account, please log in</h3>
        <LoginForm />
      </div>
      <hr />
      <div className="text-center mt-5 mb-5">
        <h3>If you don't have an account, please create one</h3>
        <SigninForm />
      </div>
    </div>
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
  if (await auth(token)) {
    return {
      redirect: {
        destination: "/",
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
