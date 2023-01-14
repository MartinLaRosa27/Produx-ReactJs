import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";

export default configureStore({
  reducer: {
    userSlice,
    productSlice,
  },
});
