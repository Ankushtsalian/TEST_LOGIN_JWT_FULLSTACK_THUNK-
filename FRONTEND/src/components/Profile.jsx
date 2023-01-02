import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  handleProfileInputState,
  profileImage,
  profileName,
} from "../Redux/index";
import Loader from "./Loader";

const Profile = () => {
  const { uploaded, imageValue, user, isLoading, errorStatusCode } =
    useSelector((state) => state.profile);
  const { tokenLog } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const fetchProfile = async () => {
    dispatch(profileName());
  };

  const handleFileInput = async (event) => {
    const imageFile = event.target.files[0];
    let formData = new FormData();
    formData = { ...formData, ["image"]: imageFile };

    dispatch(profileImage(formData));
  };

  useEffect(() => {
    if (tokenLog) {
      fetchProfile();
    }

    return () => {
      console.log("done fetchProfile2");
    };
  }, []);

  if (!tokenLog || errorStatusCode === 401) {
    console.log(
      ".............................NAVIGATING....PROFILE................................."
    );

    return <Navigate to="/login" />;
  }

  if (isLoading) return <Loader />;

  return (
    <div className="profile-container">
      <div
        className="profile-img-con"
        onClick={() => dispatch(handleProfileInputState())}
      >
        <img className="profile-img" src={imageValue} alt="profile-img" />
      </div>
      <p title={user}>Welcome {String(user).split(" ")[0]}</p>

      {uploaded && (
        <div className="profile-dropdown-container">
          <input
            type="file"
            className={`${!uploaded ? "file" : "show"}`}
            onChange={handleFileInput}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
