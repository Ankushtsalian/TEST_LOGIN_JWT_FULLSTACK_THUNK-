require("dotenv").config();
require("express-async-errors");
require("./db/connect");

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,

  api_key: process.env.CLOUD_API_KEY,

  api_secret: process.env.CLOUD_API_SECRET,
});

const connectDB = require("./db/connect");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

var cors = require("cors");
const authenticateUser = require("./middleware/auth");
app.use(cors());

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const router = require("./routes/main");
const jobRouter = require("./routes/JobRoute");
const productRoutes = require("./routes/Product");
// middleware
app.use(express.static("./Assets"));
app.use(fileUpload({ useTempFiles: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", router);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/products", authenticateUser, productRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
