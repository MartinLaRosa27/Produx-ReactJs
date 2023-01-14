import Head from "next/head";
import * as cookie from "cookie";
import { FormAddProduct } from "../../components/product/FormAddProduct";
import { auth } from "../../middleware/auth";

export default function Product({ token }) {
  return (
    <>
      <Head>
        <title>Produx - Create New Product</title>
      </Head>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <h2 className="text-center mb-4 font-weight-bold mt-4">
              Add New Product
            </h2>
            <FormAddProduct token={token} />
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
    },
  };
};
