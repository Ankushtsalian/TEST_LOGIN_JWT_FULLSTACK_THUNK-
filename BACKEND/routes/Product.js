const express = require("express");
const {
  createProduct,
  getAllProducts,
  uploadProductImage,
  deleteProduct,
  uploadProductImageToCloud,
  uploadProfileImageToCloud,
} = require("../controllers/Product");
// const { getAllUsers } = require("../controllers/main");
const router = express.Router();

router.route("/").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadProductImageToCloud);
router.route("/profile").post(uploadProfileImageToCloud);

router.route("/:id/query").delete(deleteProduct);
module.exports = router;
