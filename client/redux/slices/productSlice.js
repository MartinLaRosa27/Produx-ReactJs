import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { logout } from "./userSlice";
import { print } from "graphql";
import gql from "graphql-tag";
import axios from "axios";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    productsList: null,
  },
  reducers: {
    setProductsList: (state, action) => {
      state.productsList = action.payload;
    },
  },
});
export default productSlice.reducer;
const { setProductsList } = productSlice.actions;

// --------------------------------------------------------------------------------
export const getAllProducts = (token) => {
  const GET_ALL_PRODUCTS = gql`
    query GetAllProducts {
      getAllProducts {
        price
        name
        _id
      }
    }
  `;
  return async (dispatch) => {
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_ALL_PRODUCTS),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(async (res) => {
        if (!res.data.errors) {
          dispatch(setProductsList(res.data.data.getAllProducts));
        } else {
          toast.error(res.data.errors[0].message, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
          logout();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// --------------------------------------------------------------------------------
export const getProductById = async (id, token) => {
  let product = {};
  const GET_PRODUCT_BY_ID = gql`
    query GetProductById($getProductByIdId: String!) {
      getProductById(id: $getProductByIdId) {
        _id
        name
        price
      }
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(GET_PRODUCT_BY_ID),
        variables: {
          getProductByIdId: id,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(async (res) => {
      if (!res.data.errors) {
        product = res.data.data.getProductById;
      } else {
        toast.error(res.data.errors[0].message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        logout();
      }
    })
    .catch((e) => {
      console.log(e);
    });
  if (product._id === null) {
    product = {};
  }
  return product;
};

// --------------------------------------------------------------------------------
export const getProductByName = (name, token) => {
  const GET_PRODUCT_BY_NAME = gql`
    query GetProductByName($name: String!) {
      getProductByName(name: $name) {
        _id
        price
        name
      }
    }
  `;
  return async (dispatch) => {
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_PRODUCT_BY_NAME),
          variables: {
            name,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(async (res) => {
        if (!res.data.errors) {
          dispatch(setProductsList(res.data.data.getProductByName));
        } else {
          toast.error(res.data.errors[0].message, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
          logout();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// --------------------------------------------------------------------------------
export const postProduct = async (form, token) => {
  const POST_PRODUCT = gql`
    mutation PostProduct($input: productInput) {
      postProduct(input: $input)
    }
  `;
  return async (dispatch) => {
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(POST_PRODUCT),
          variables: {
            input: form,
          },
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(async (res) => {
        if (!res.data.errors) {
          toast.success(res.data.data.postProduct, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
          dispatch(getAllProducts(token));
        } else {
          toast.error(res.data.errors[0].message, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// --------------------------------------------------------------------------------
export const patchProduct = async (form, id, token) => {
  let confirmation = false;
  const POST_PRODUCT = gql`
    mutation PatchProduct($patchProductId: String!, $input: productInput) {
      patchProduct(id: $patchProductId, input: $input)
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(POST_PRODUCT),
        variables: {
          input: form,
          patchProductId: id,
        },
      },
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then(async (res) => {
      if (!res.data.errors) {
        toast.success(res.data.data.patchProduct, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        confirmation = true;
      } else {
        toast.error(res.data.errors[0].message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return confirmation;
};

// --------------------------------------------------------------------------------
export const deleteProduct = (id, token) => {
  const DELETE_PRODUCT = gql`
    mutation DeleteProduct($deleteProductId: String!) {
      deleteProduct(id: $deleteProductId)
    }
  `;
  return async (dispatch) => {
    let postConfirmation = false;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(DELETE_PRODUCT),
          variables: {
            deleteProductId: id,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(async (res) => {
        if (!res.data.errors) {
          toast.success(res.data.data.deleteProduct, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
          dispatch(getAllClients(token));
          postConfirmation = true;
        } else {
          toast.error(res.data.errors[0].message, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    return postConfirmation;
  };
};
