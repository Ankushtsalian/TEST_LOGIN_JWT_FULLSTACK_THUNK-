const mongoose = require("mongoose");

const ProfileImageSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      required: [true, "please provide public_id"],
    },
    src: {
      type: String,
      required: [true, "please provide public_id"],
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

module.exports = mongoose.model("Profile", ProfileImageSchema);
