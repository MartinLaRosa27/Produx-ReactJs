import React, { useEffect } from "react";
import { ProductInfo } from "./ProductInfo";
import { Search } from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/slices/productSlice";

export const Product = ({ token }) => {
  const { productsList } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(token));
  }, [dispatch]);

  return (
    <>
      <h2 className="text-center my-5">List of Products</h2>
      {productsList === null && <h3 className="text-center">Loading...</h3>}
      {productsList !== null && productsList.length === 0 && (
        <h3 className="text-center mb-5">There isn't any product registered</h3>
      )}
      {productsList !== null && productsList.length > 0 && (
        <>
          <Search token={token} />
          <table className="table table-striped container">
            <thead className="bg-primary table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsList.map((product) => {
                return (
                  <ProductInfo
                    product={product}
                    key={product._id}
                    token={token}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
