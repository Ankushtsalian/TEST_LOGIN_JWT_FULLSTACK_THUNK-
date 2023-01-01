import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import FormRow from "./FormRow";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearAllProfileInputState,
  getAllProducts,
  handleFormInput,
  productFile,
} from "../Redux/Product-store/Product-Slice";
const url = "http://localhost:5000/api/v1/products";
const FileInput = () => {
  const { isLoading, src, productList, name, price, image, public_id } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();
  const fileFormData = {
    name,
    price,
    imageDetail: { image, public_id },
  };

  const fetchProducts = async () => {
    dispatch(getAllProducts());
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      console.log("done fetchProducts");
    };
  }, []);

  const handleFileInput = async (event) => {
    const imageFile = event.target.files[0];
    let formData = new FormData();
    formData = { ...formData, ["image"]: imageFile };
    dispatch(productFile(formData));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleFormInput({ name, value }));
  };

  const handleForm = async (event) => {
    event.preventDefault();
    try {
      await axios.post(url, fileFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      alert("Image suceesfully Uploaded");
      fetchProducts();
      dispatch(ClearAllProfileInputState());
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleDelete = async (e, id, publicId) => {
    e.preventDefault();

    try {
      await axios.delete(`${url}/${id}/query?publicId=${publicId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      alert("Product Deleted");
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

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
          {isLoading ? (
            <Loader />
          ) : (
            <button className="control" type="button" onClick={handleForm}>
              Submit
            </button>
          )}
        </form>
      </div>
      <div className="product-img-container">
        {isLoading ? (
          <Loader />
        ) : (
          <Product
            isLoading={isLoading}
            productList={productList}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default FileInput;
