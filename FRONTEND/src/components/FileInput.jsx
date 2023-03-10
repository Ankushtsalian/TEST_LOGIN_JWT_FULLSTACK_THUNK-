import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import FormRow from "./FormRow";
import Loader from "./Loader";
import {
  getAllProducts,
  handleFormInputProduct,
  productFile,
  productFormData,
} from "../Redux/index";
import { addProductsToLocalStorage } from "../utils/Local-Storage";
import { clearProduct } from "../Redux/Product-store/Product-Slice";

const FileInput = () => {
  const {
    productList,
    isLoading,
    name,
    price,
    image,
    public_id,
    errorStatusCode,
  } = useSelector((state) => state.product);
  const { tokenLog } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const fileFormData = {
    name,
    price,
    imageDetail: { image, public_id },
  };

  const fetchProducts = async () => {
    dispatch(getAllProducts());
  };

  const handleFileInput = async (event) => {
    const imageFile = event.target.files[0];
    let formData = new FormData();
    formData = { ...formData, ["image"]: imageFile };
    dispatch(productFile(formData));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleFormInputProduct({ name, value }));
  };

  const handleForm = async (event) => {
    event.preventDefault();
    dispatch(productFormData(fileFormData));
    dispatch(clearProduct());

    fetchProducts();
    // dispatch(ClearAllProductInputState());
  };

  useEffect(() => {
    if (tokenLog) {
      fetchProducts();
    }

    return () => {
      console.log("done fetchProducts2");
    };
  }, []);

  if (!tokenLog || errorStatusCode === 401) {
    console.log(
      ".............................NAVIGATING....................................."
    );

    return <Navigate to="/login" />;
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="file-form-container">
        <form className="login-form">
          <FormRow
            name="name"
            value={name}
            label="Name"
            onChange={handleInput}
            type="text"
          />
          <FormRow
            name="price"
            label="Price"
            onChange={handleInput}
            type="text"
            value={price}
          />

          <div className="textbox-container">
            <input
              className="input"
              type="file"
              required
              name="image"
              onChange={handleFileInput}
            />
          </div>
          <button className="control" type="button" onClick={handleForm}>
            Submit
          </button>
        </form>
      </div>
      <div className="product-img-container">
        <Product />
      </div>
    </>
  );
};

export default FileInput;
