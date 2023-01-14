const bcryptjs = require("bcryptjs");

module.exports.hashPassword = async (password) => {
  const hashedPassword = bcryptjs.hash(password, await bcryptjs.genSalt(10));
  return hashedPassword;
};

module.exports.comparePasswords = async (password, userPassword) => {
  return await bcryptjs.compare(password, userPassword);
};
