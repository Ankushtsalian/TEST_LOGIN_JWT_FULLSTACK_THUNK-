const CustomAPIError = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err.statusCode === 400)
    return res
      .status(err.statusCode)
      .json({ msg: "Please check value provided" });
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).send("Something went wrong try again later");
};

module.exports = errorHandlerMiddleware;
