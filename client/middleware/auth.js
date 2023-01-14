import { print } from "graphql";
import gql from "graphql-tag";
import axios from "axios";

module.exports.auth = async (token) => {
  let validation = false;
  const USER_VALIDATION = gql`
    query Query {
      userValidation
    }
  `;
  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(USER_VALIDATION),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(async (res) => {
      validation = res.data.data.userValidation;
    })
    .catch((e) => {
      console.log(e);
    });
  return validation;
};
