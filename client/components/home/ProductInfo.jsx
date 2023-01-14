import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/slices/productSlice";

export const ProductInfo = ({ product, token }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{product.name}</td>
      <td className="font-weight-bold">{product.price}</td>

      <td className="actions">
        <Link
          href={`/product/edit/${product._id}`}
          className="btn btn-primary mr-2"
        >
          EDIT
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => dispatch(deleteProduct(product._id, token))}
        >
          DELETE
        </button>
      </td>
    </tr>
  );
};
