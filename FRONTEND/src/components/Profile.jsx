import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import img from "../Assets/profile.png";
const url = "http://localhost:5000/api/v1/products";
let user;

const Profile = () => {
  const [uploaded, setUploaded] = useState(false);
  let [imageValue, setimageValue] = useState(localStorage.getItem("profile"));
  const fetchProfile = async () => {
    try {
      const products = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      user = products.data.user;
      setimageValue(products.data.src);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    return () => {
      console.log("done");
    };
  }, []);
  const handleFileInput = async (event) => {
    const imageFile = event.target.files[0];
    console.log(event.target.files);
    let formData = new FormData();
    formData = { ...formData, ["image"]: imageFile };
    try {
      // setIsLoading(true);
      console.log(localStorage.getItem("Token"));
      const {
        data: {
          image: { src },
          public_id,
        },
      } = await axios.post(`${url}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      setimageValue(src);
      setUploaded(!uploaded);
      localStorage.setItem("profile", src);
      alert("Profile uploaded");
    } catch (error) {
      imageValue = null;
      console.log(error);
    }
    // setIsLoading(false);
  };

  return (
    <div className="profile-container">
      <input
        type="file"
        className={`${!uploaded ? "file" : "show"}`}
        onChange={handleFileInput}
      />
      <div onClick={() => setUploaded(!uploaded)}>
        <img className="profile-img" src={imageValue} />
      </div>
      <p title={user}>Welcome {String(user).split(" ")[0]}</p>
    </div>
  );
};

export default Profile;
