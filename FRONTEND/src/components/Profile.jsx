import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleProfileInputState,
  profileImage,
  profileName,
} from "../Redux/Profile-Store/Profile-Slice";
import Loader from "./Loader";

const Profile = () => {
  const { uploaded, imageValue, user, isLoading } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    dispatch(profileName());
  };

  useEffect(() => {
    fetchProfile();
    return () => {
      console.log("done");
    };
  }, []);

  const handleFileInput = async (event) => {
    const imageFile = event.target.files[0];
    let formData = new FormData();
    formData = { ...formData, ["image"]: imageFile };

    dispatch(profileImage(formData));
  };
  if (isLoading) return <Loader />;
  return (
    <div className="profile-container">
      <input
        type="file"
        className={`${!uploaded ? "file" : "show"}`}
        onChange={handleFileInput}
      />
      <div onClick={() => dispatch(handleProfileInputState())}>
        <img className="profile-img" src={imageValue} alt="profile-img" />
      </div>
      <p title={user}>Welcome {String(user).split(" ")[0]}</p>
    </div>
  );
};

export default Profile;
