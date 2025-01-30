const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: String,
  author: String,
  description: String,
  price: String,
  coverImage: String,
  quantity: { type: Number, default: 1 },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
