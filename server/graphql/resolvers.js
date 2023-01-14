const {
  postUser,
  authenticateUser,
  userValidation,
} = require("../controllers/userController");
const {
  getAllProducts,
  getProductById,
  getProductByName,
  deleteProduct,
  postProduct,
  patchProduct,
} = require("../controllers/productController");

module.exports.resolvers = {
  Query: {
    // User:
    userValidation: (root, {}, context) => {
      return userValidation(context.user);
    },

    // Product:
    getAllProducts: (root, {}, context) => {
      return getAllProducts(context.user);
    },

    getProductById: (root, { id }, context) => {
      return getProductById(id, context.user);
    },

    getProductByName: (root, { name }, context) => {
      return getProductByName(name, context.user);
    },
  },

  Mutation: {
    // User:
    postUser: (root, { input }, context) => {
      console.log("frfedvfgedwvf");
      return postUser(input);
    },

    authenticateUser: (root, { input }, context) => {
      return authenticateUser(input);
    },

    // Product:
    deleteProduct: (root, { id }, context) => {
      return deleteProduct(id, context.user);
    },

    postProduct: (root, { input }, context) => {
      return postProduct(input, context.user);
    },

    patchProduct: (root, { id, input }, context) => {
      return patchProduct(id, input, context.user);
    },
  },
};
