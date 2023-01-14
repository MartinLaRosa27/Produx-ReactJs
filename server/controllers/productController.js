const Product = require("../models/Product");

module.exports.getAllProducts = async (user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  try {
    const products = await Product.find({ userId: user._id }).sort({
      updatedAt: "desc",
    });
    return products;
  } catch (e) {
    console.log(e);
    throw new Error("Cannot get the registerd products by the user");
  }
};

module.exports.getProductById = async (id, user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  let product = [];
  try {
    product = await Product.findOne({
      _id: id,
      userId: user._id,
    }).sort({ updatedAt: "desc" });
  } catch (e) {
    console.log(e);
  }
  return product;
};

module.exports.getProductByName = async (name, user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  let product = [];
  try {
    product = await Product.find({
      name: { $regex: new RegExp(".*" + name, "i") },
      userId: user._id,
    }).sort({ updatedAt: "desc" });
  } catch (e) {
    console.log(e);
  }
  return product;
};

module.exports.deleteProduct = async (id, user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  try {
    await Product.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    return "Product record deleted succesfully";
  } catch (e) {
    console.log(e);
    throw new Error("Cannot delete the product record");
  }
};

module.exports.postProduct = async (input, user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  try {
    input.userId = user._id;
    const product = new Product(input);
    await product.save();
    return "Product record created succesfully";
  } catch (e) {
    console.log(e);
    throw new Error("Cannot create the product record");
  }
};

module.exports.patchProduct = async (id, input, user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  try {
    await Product.findOneAndUpdate({ _id: id, userId: user._id }, input, {
      new: true,
    });
    return "Product record updated succesfully";
  } catch (e) {
    console.log(e);
    throw new Error("Cannot update the product record");
  }
};
