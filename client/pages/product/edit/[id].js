import React, { useState, useEffect } from "react";
import Head from "next/head";
import * as cookie from "cookie";
import { FormEditProduct } from "../../../components/productEdit/FormEditProduct";
import { getProductById } from "../../../redux/slices/productSlice";
import { auth } from "../../../middleware/auth";

export default function EditProduct({ _id, token }) {
  const [product, setProudct] = useState(null);

  useEffect(() => {
    const callGetProductById = async () => {
      setProudct(await getProductById(_id, token));
    };
    callGetProductById();
  }, []);

  return (
    <>
      <Head>
        <title>Produx - Edit Product {product}</title>
      </Head>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <h2 className="text-center mb-4 font-weight-bold mt-4">
              Edit Product
            </h2>
            {product !== null && !Object.keys(product).length && (
              <h3 className="text-center">Product Information not found</h3>
            )}
            {product !== null && Object.keys(product).length && (
              <FormEditProduct product={product} token={token} />
            )}
            {product === null && (
              <h3 className="text-center">Loading Product Information...</h3>
            )}
          </div>
        </div>
      </div>
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
      _id: context.params.id,
    },
  };
};
