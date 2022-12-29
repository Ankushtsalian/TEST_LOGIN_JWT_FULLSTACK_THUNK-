const jwt = require("jsonwebtoken");
const registerSchema = require("../model/register");
const CustomAPIError = require("../errors/custom-error");
/**---------------------------REGISTER-------------------------------------- */

const register = async (req, res) => {
  const { username } = req.body;
  const findUser = await registerSchema.find({ username });
  if (findUser.length !== 0) {
    throw new CustomAPIError("User Exist", 401);
  }
  const user = await registerSchema.create({ ...req.body });
  const token = user.createJWT();

  res.status(200).json({ msg: { username: user.username, token } });
};

/**---------------------------REGISTER-------------------------------------- */

/**---------------------------LOGIN-------------------------------------- */

const login = async (req, res) => {
  const { username, password } = req.body;
  // const { authorization } = req.headers;

  if (!username || !password)
    throw new CustomAPIError("Please provide email and password", 400);

  const user = await registerSchema.findOne({ username });

  if (!user) throw new CustomAPIError("Unathorized User", 404);

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) throw new CustomAPIError("invalid Credentials", 401);

  const token = user.createJWT();
  return res.status("200").json({ msg: { username: user.username, token } });

  // const [{ token }] = findUser;

  // const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // if (decoded.username === username)
  //   return res.status("200").json({ msg: { decoded, token } });
  // throw new CustomAPIError("Unathorized User", 404);
};

/**---------------------------LOGIN-------------------------------------- */

const deleteUser = async (req, res) => {
  await registerSchema.deleteMany();
  return res.status("200").json({ msg: "User  deleted" });
};

const getAllUsers = async (req, res) => {
  const users = await registerSchema.find().select("username");
  res.status("200").json({ msg: users });
};

/**---------------------------DASHBOARD-------------------------------------- */
const dashboard = async (req, res) => {
  res.send("hello dashboard");
};
/**---------------------------DASHBOARD-------------------------------------- */

module.exports = {
  login,
  register,
  dashboard,
  deleteUser,
  getAllUsers,
};
