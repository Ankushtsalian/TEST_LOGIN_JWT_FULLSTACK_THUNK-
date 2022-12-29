const express = require("express");
const {
  createJob,
  getAllJob,
  getSingleJob,
  deleteJobs,
} = require("../controllers/Job");
const { getAllUsers } = require("../controllers/main");
const router = express.Router();

router.route("/").post(createJob).get(getAllJob);

router.route("/users").get(getAllUsers);
router.route("/:id").get(getSingleJob).delete(deleteJobs);

module.exports = router;
