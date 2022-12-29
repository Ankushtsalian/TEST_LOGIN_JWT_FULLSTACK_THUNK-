// const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const auth = (req, res, next) => {
  //check HEADER

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Authentication Invalid", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // const user = User.findById(payload.id).select("-password");
    // req.user = user;

    req.user = { userId: payload.userId, username: payload.username };

    next();
  } catch (error) {
    throw new CustomAPIError("Authentication Invalid1", 401);
  }
};
module.exports = auth;
