const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide  name"],
    },
    price: {
      type: Number,
      required: [true, "please provide Price"],
    },
    image: {
      type: String,
      required: [true, "please provide image"],
    },
    public_id: {
      type: String,
      required: [true, "please provide  public_id"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Register",
      required: [true, "please provide user"],
    },
    createdByName: {
      type: String,
      ref: "Register",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
