const jwt = require("jsonwebtoken");
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

ProductSchema.methods.verifyJWT = function (token) {
  let tokenValue = token.split(" ")[1];
  const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

  if (decoded.userId === String(this.createdBy))
    return { msg: { decoded, token } };
  throw new CustomAPIError("Unathorized User", 404);
};
// ProductSchema.methods.validateToken = function (token) {
//   console.log("token");
//
//   return token;
// };

module.exports = mongoose.model("Product", ProductSchema);
