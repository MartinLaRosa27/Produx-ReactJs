const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 5,
    maxLength: 150,
  },

  password: {
    type: String,
    require: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    require: true,
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
    require: true,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
