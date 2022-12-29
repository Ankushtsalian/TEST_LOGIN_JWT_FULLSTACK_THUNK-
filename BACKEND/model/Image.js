const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      required: [true, "please provide public_id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
