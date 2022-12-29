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
    required: [true, "must provide username"],
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

module.exports = mongoose.model("Register", registerSchema);
