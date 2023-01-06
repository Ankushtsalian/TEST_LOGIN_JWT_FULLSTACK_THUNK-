const Product = require("../model/Product");
const Image = require("../model/Image");
const Profile = require("../model/Profile");
const registerSchema = require("../model/register");

const path = require("path");
const CustomAPIError = require("../errors/custom-error");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
/**----------------------------------CREATE PRODUCT------------------------------------ */

const createProduct = async (req, res) => {
  const {
    name,
    price,
    imageDetail: { image, public_id },
  } = req.body;
  try {
    const product = await Product.create({
      name,
      price,
      image,
      public_id,
      createdBy: req.user.userId,
      createdByName: req.user.username,
    });
    res.status(200).json({ product });
  } catch (error) {
    throw new CustomAPIError(error, 400);
  }
};
/**----------------------------------CREATE PRODUCT------------------------------------ */

const getProfile = async (req, res) => {
  const profileValidation = await registerSchema.findOne({
    username: req.user.username,
  });
  profileValidation?.verifyJWT(req.headers.authorization);

  let dbImages = await Image.find().select("public_id");
  let productImageId = await Product.find().select("public_id");

  const profiles = await Profile.find({
    createdBy: String(req.user.userId),
  }).select("public_id src");

  if (!profiles.length) {
    return res.status(200).json({
      src: "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=996&t=st=1672733954~exp=1672734554~hmac=26d7faea21b262d03172b28a3394156343a0b14cef5b0df68f0a8c792f3f857a",
      user: req.user.username,
    });
  }

  let profileId = [];
  let src = [];

  profiles.forEach((profile) => {
    profileId.push(profile.public_id);
    src.push(profile.src);
  });

  profileId = profileId.slice(0, profileId.length - 1);

  src = src.slice(profileId.length);
  let map = {};

  let combined = [...dbImages, ...productImageId];

  productImageId = productImageId.map((image) => image.public_id);

  combined.forEach((image) => (map[image.public_id] = image.public_id));
  combinedProductId = Object.values(map);

  const FileterdimagesId = combinedProductId.filter(
    (image) => !productImageId.includes(image)
  );
  [...FileterdimagesId, ...profileId].forEach(async (publicId) => {
    await cloudinary?.uploader.destroy(publicId);
    await Image?.deleteOne({ public_id: publicId });
    await Profile?.deleteOne({ public_id: publicId });
  });
  console.log({ src, user: req.user.username });

  res.status(200).json({ src, user: req.user.username });
};

/**----------------------------------GET ALL PRODUCT------------------------------------ */

const getAllProducts = async (req, res) => {
  const productValidation = await Product.findOne({
    createdByName: req.user.username,
  });
  productValidation?.verifyJWT(req.headers.authorization);

  const products = await Product.find({
    createdBy: String(req.user.userId),
  }).select("name price image  public_id");

  if (!products.length) {
    return res.status(200).json({ products: [], user: req.user.username });
  }

  res.status(200).json({ products, user: req.user.username });
};
/**----------------------------------GET ALL PRODUCT------------------------------------ */

/**----------------------------------UPLOADED IMAGE TO SERVER------------------------------------ */
const uploadProductImage = async (req, res) => {
  let productImage = req.files.image;

  if (!req.files) throw new CustomAPIError("No file uploaded", 400);
  if (!productImage.mimetype.startsWith("image"))
    throw new CustomAPIError("Please Upload image", 400);

  const maxSize = 1024 * 1024;

  if (!productImage.size > maxSize)
    throw new CustomAPIError("Please Upload image smaller than 1kb", 400);

  try {
    const imagePath = path.join(
      __dirname,
      "../Assets/uploads/" + `${productImage.name}`
    );

    await productImage.mv(imagePath);
    res.status(200).json({ image: { src: `/uploads/${productImage.name}` } });
  } catch (error) {
    throw new CustomAPIError(error, 400);
  }
};
/**----------------------------------UPLOADED IMAGE TO SERVER------------------------------------ */

/**----------------------------------DELETE PRODUCT------------------------------------ */

const deleteProduct = async (req, res) => {
  const { publicId } = req.query;
  await Product.deleteOne({ _id: req.params.id });
  await Image.deleteOne({ public_id: publicId });
  await cloudinary.uploader.destroy(publicId);
  res.status(200).send();
};

/**----------------------------------DELETE PRODUCT----------------------------------- */

/**----------------------------------UPLOADED IMAGE TO CLOUD------------------------------------ */

const uploadProductImageToCloud = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Product-upload",
    }
  );
  await Image.create({ public_id: result.public_id });
  fs.unlinkSync(req.files.image.tempFilePath);

  res.status(200).json({
    image: { src: result.secure_url },
    public_id: result.public_id,
  });
};
const uploadProfileImageToCloud = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Profile-Upload",
    }
  );

  await Profile.create({
    public_id: result.public_id,
    src: result.secure_url,
    createdBy: req.user.userId,
    createdByName: req.user.username,
  });
  fs.unlinkSync(req.files.image.tempFilePath);

  res.status(200).json({
    image: { src: result.secure_url },
    public_id: result.public_id,
  });
};
/**----------------------------------UPLOADED IMAGE TO CLOUD------------------------------------ */

module.exports = {
  createProduct,
  getAllProducts,
  uploadProductImageToCloud,
  deleteProduct,
  uploadProfileImageToCloud,
  getProfile,
};
