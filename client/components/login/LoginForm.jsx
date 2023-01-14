import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { authenticateUser } from "../../redux/slices/userSlice";

export const LoginForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("The email direction is required.")
        .email("Invalid email."),
      password: Yup.string().required("The password is required."),
    }),
    onSubmit: async (FormData) => {
      if (await authenticateUser(FormData)) {
        formik.handleReset();
        router.push("/");
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email_login">Email</label>
          <input
            type="email"
            className="form-control"
            id="email_login"
            required
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.values.email.length !== 0 && (
            <small className="text-danger">{formik.errors.email}</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password_login">Password</label>
          <input
            type="password"
            className="form-control"
            id="password_login"
            required
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          {formik.errors.password && formik.values.password.length !== 0 && (
            <small className="text-danger">{formik.errors.password}</small>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            formik.errors.password ||
            formik.errors.email ||
            formik.values.email.length === 0 ||
            formik.values.password.length === 0
          }
        >
          LogIn
        </button>
      </form>
    </div>
  );
};
