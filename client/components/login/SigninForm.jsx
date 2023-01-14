import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { postUser } from "../../redux/slices/userSlice";

export const SigninForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordAux: "",
      confirmation: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("The email direction is required.")
        .email("Invalid email.")
        .min(5, "The email only can have between 5 and 150 characters.")
        .max(150, "The email only can have between 5 and 150 characters."),
      password: Yup.string()
        .required("The password is required.")
        .min(8, "The password only can have between 8 and 25 characters.")
        .max(25, "The password only can have between 8 and 25 characters.")
        .matches(
          /^[0-9a-zA-Z]+$/,
          "The password can only contain lowercase letters, uppercase letters, and numbers."
        )
        .oneOf([Yup.ref("passwordAux")], "The passwords entered do not match."),
      passwordAux: Yup.string().required("The password check is required."),
      confirmation: Yup.string()
        .required("Please accept the terms and conditions.")
        .matches(true, "Please accept the terms and conditions.."),
    }),
    onSubmit: async (FormData) => {
      if (await postUser(FormData)) {
        formik.handleReset();
        router.push("/");
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email_signin">Email</label>
          <input
            type="email"
            className="form-control"
            id="email_signin"
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
          <label htmlFor="password_signin">Password</label>
          <input
            type="password"
            className="form-control"
            id="password_signin"
            required
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          {formik.errors.password && formik.values.password.length !== 0 && (
            <small className="text-danger">{formik.errors.password}</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="passwordaux_signin">Password Check</label>
          <input
            type="password"
            className="form-control"
            id="passwordaux_signin"
            required
            name="passwordAux"
            onChange={formik.handleChange}
            value={formik.values.passwordAux}
          />

          {formik.errors.passwordAux &&
            formik.values.passwordAux.length !== 0 && (
              <small className="text-danger">{formik.errors.passwordAux}</small>
            )}
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="confirmation_sigin"
            required
            name="confirmation"
            onChange={formik.handleChange}
            value={formik.values.confirmation}
          />
          <label className="form-check-label" htmlFor="confirmation_sigin">
            I accept all the terms and conditions
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            formik.errors.password ||
            formik.errors.email ||
            formik.errors.passwordAux ||
            formik.errors.confirmation ||
            formik.values.passwordAux.length === 0 ||
            formik.values.email.length === 0 ||
            formik.values.password.length === 0
          }
        >
          SignIn
        </button>
      </form>
    </div>
  );
};
