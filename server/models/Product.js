const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    minlength: 1,
    maxLength: 140,
  },

  price: {
    type: Number,
    require: true,
    min: 0,
    max: 9999999,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    require: true,
  },

  updatedAt: {
    type: String,
    default: Date.now(),
    require: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = Client = mongoose.model("Client", ClientSchema);
