import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { patchProduct } from "../../redux/slices/productSlice";

export const FormEditProduct = ({ product, token }) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: product.name,
      price: product.price,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("The name field is required")
        .min(1, "The name field must have between 1 and 140 characters.")
        .max(140, "The name field must have between 1 and 140 characters."),
      price: Yup.number()
        .required("The price field is required")
        .min(0, "The price value cannot be less than 0"),
    }),
    onSubmit: async (FormData) => {
      if (await patchProduct(FormData, product._id, token)) {
        router.push("/");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group ml-3 mr-3">
        <label>Product Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Product Name"
          maxLength={140}
          minLength={3}
          required
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && formik.values.name.length !== 0 && (
          <small className="text-danger">{formik.errors.name}</small>
        )}
      </div>
      <div className="form-group ml-3 mr-3">
        <label>Product Price</label>
        <input
          type="number"
          className="form-control"
          placeholder="Product Price"
          min={0}
          step="any"
          required
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
        {formik.errors.price && formik.values.price.length !== 0 && (
          <small className="text-danger">{formik.errors.price}</small>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary font-weight-bold text-uppercase d-block pr-5 pl-5 mb-4 ml-3 mr-3"
        disabled={
          formik.errors.name ||
          formik.errors.price ||
          formik.values.name.length === 0 ||
          formik.values.price.length === 0
        }
      >
        ADD
      </button>
    </form>
  );
};
