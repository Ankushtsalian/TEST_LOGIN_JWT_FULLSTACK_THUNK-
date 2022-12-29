import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import FormRow from "./FormRow";
import Loader from "./Loader";
const imgUrl = "http://localhost:5000";
const url = "http://localhost:5000/api/v1/products";
const FileInput = () => {
  const [fileFormData, setFileFormData] = useState({
    name: "",
    price: "",
    imageDetail: {
      image: "",
      public_id: "",
    },
  });
  const [productList, setProducts] = useState([]);
  const {
    name,
    price,
    imageDetail: { image, public_id },
  } = fileFormData;
  let imageValue;
  let src;
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const products = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      src = products.data.src;
      setProducts(products.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      console.log("done");
    };
  }, []);

  const handleFileInput = async (event) => {
    const imageFile = event.target.files[0];
    let formData = new FormData();
    formData = { ...formData, ["image"]: imageFile };
    // formData.append("image", imageFile);
    try {
      setIsLoading(true);

      const {
        data: {
          image: { src },
          public_id,
        },
      } = await axios.post(`${url}/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      imageValue = src;
      alert(imageValue);

      setFileFormData((data) => ({
        ...data,
        imageDetail: {
          image: imageValue,
          public_id,
        },
      }));
    } catch (error) {
      imageValue = null;
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFileFormData((data) => ({ ...data, [name]: value }));
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
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleDelete = async (e, id, publicId) => {
    e.preventDefault();
    setIsLoading(true);

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
    setIsLoading(false);
  };

  return (
    <>
      <div className="file-form-container">
        <form className="login-form">
          <FormRow
            name="name"
            label="Name"
            onChange={handleInput}
            type="text"
          />
          <FormRow
            name="price"
            label="Price"
            onChange={handleInput}
            type="text"
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
            setIsLoading={setIsLoading}
            productList={productList}
            handleDelete={handleDelete}
            src={src}
          />
        )}
      </div>
    </>
  );
};

export default FileInput;
