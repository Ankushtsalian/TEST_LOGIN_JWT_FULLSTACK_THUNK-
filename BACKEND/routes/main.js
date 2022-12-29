const express = require("express");
const {
  login,
  register,
  dashboard,
  deleteUser,
  getAllUsers,
} = require("../controllers/main");
const router = express.Router();

router.route("/login").post(login).get(getAllUsers);
router.route("/register").post(register);
router.route("/dashboard").get(dashboard);
router.route("/:id").delete(deleteUser);

module.exports = router;
