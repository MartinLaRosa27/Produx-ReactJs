const User = require("../models/User");
const { hashPassword, comparePasswords } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");

module.exports.postUser = async (input) => {
  const { email, password, passwordAux } = input;
  if (password.length < 8 || password.length > 25) {
    throw new Error("Invalid entered values");
  }
  if (password != passwordAux) {
    throw new Error("Passwords don't match");
  }
  const userExists = await User.findOne({
    email,
  });
  if (userExists) {
    throw new Error("The entered email is already registered");
  }
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    const token = createToken(newUser);
    return {
      token,
    };
  } catch (e) {
    console.log(e);
    throw new Error("Failed to register the user");
  }
};

module.exports.authenticateUser = async (input) => {
  const { email, password } = input;
  const userExits = await User.findOne({
    email,
  });
  if (!userExits) {
    throw new Error("The user is not registered");
  }
  const passwordValidation = await comparePasswords(
    password,
    userExits.password
  );
  if (!passwordValidation) {
    throw new Error("Incorrect password");
  }
  try {
    const token = createToken(userExits);
    return {
      token,
    };
  } catch (e) {
    console.log(e);
    if (!passwordValidation) {
      throw new Error("Authentication error");
    }
  }
};

module.exports.userValidation = async (user) => {
  let validUser = false;
  try {
    const userExists = await User.findOne({
      _id: user._id,
    });
    if (userExists) {
      validUser = true;
    }
  } catch (e) {
    console.log(e);
  }
  return validUser;
};
