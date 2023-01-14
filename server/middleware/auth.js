const { decodeToken } = require("../helpers/jwt");

module.exports.auth = (token) => {
  if (!token) {
    return "";
  }
  try {
    return decodeToken(token);
  } catch (e) {
    return "";
  }
};
