const CustomAPIError = require("../errors/custom-error");
const Job = require("../model/Job");

const createJob = async (req, res) => {
  // console.log({
  //   ...req.body,
  //   createdBy: req.user.userId,
  //   createdByName: req.user.username,
  // });

  const job = await Job.create({
    ...req.body,
    createdBy: req.user.userId,
    createdByName: req.user.username,
  });
  // throw new CustomAPIError("Please provide email and password", 400);

  return res.send(`Job created with JobId ${job._id}`);
};

const getSingleJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id }).select(
    "status company position createdBy createdByName"
  );

  res.status(200).json({ msg: job });
};
const getAllJob = async (req, res) => {
  const job = await Job.find().select(
    "status company position createdBy createdByName"
  );

  res.status(200).json({ msg: job });
};

const deleteJobs = async (req, res) => {
  await Job.deleteMany();
  return res.status("200").json({ msg: "Job  deleted" });
};

module.exports = { deleteJobs, createJob, getAllJob, getSingleJob };
