const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "must provide username"],
  },
  password: {
    type: String,
    required: [true, "must provide passsword"],
  },
  token: {
    type: String,
  },
});

registerSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

registerSchema.methods.createJWT = function () {
  const userToken = jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return userToken;
};

registerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

registerSchema.methods.verifyJWT = function (token) {
  let tokenValue = token.split(" ")[1];
  const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
  if (decoded.username === String(this.username))
    return { msg: { decoded, token } };
  throw new CustomAPIError("Unathorized User", 404);
};
module.exports = mongoose.model("Register", registerSchema);
