const { gql } = require("apollo-server");

module.exports.typeDefs = gql`
  input userInput {
    email: String!
    password: String!
    passwordAux: String
  }

  input productInput {
    name: String!
    price: Float!
  }

  type Token {
    token: String
  }

  type Product {
    _id: String
    name: String
    price: Float
  }

  type Query {
    userValidation: Boolean
    getAllProducts: [Product]
    getProductById(id: String!): Product
    getProductByName(name: String!): [Product]
  }

  type Mutation {
    postUser(input: userInput): Token
    authenticateUser(input: userInput): Token
    deleteProduct(id: String!): String
    postProduct(input: productInput): String
    patchProduct(id: String!, input: productInput): String
  }
`;
