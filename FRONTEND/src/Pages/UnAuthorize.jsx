import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ClearAllProductState,
  ClearAllProductInputState,
  ClearAllProfileState,
  clearUserToken,
  clearUserFormInput,
} from "../Redux/index";
import { getTokenFromLocalStorage } from "../utils/Local-Storage";

const UnAuthorize = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // useEffect(() => {
  //   return console.log("PROTECTED ROUTE ENTERED");
  // }, []);
  // if (userError === 401 || profileError === 401 || productError === 401) {
  //   alert("UNAUTHORIZED USER, Please login");

  //   dispatch(clearUserToken());
  //   dispatch(ClearAllProfileState());
  //   dispatch(ClearAllProductState());
  // }
  setTimeout(() => {
    alert("UNAUTHORIZED USER, Please login");

    if (getTokenFromLocalStorage()) {
      console.log("UNAUTHORIZED USER, Please login");
      // dispatch(clearUserFormInput());
      dispatch(clearUserToken());
      dispatch(ClearAllProfileState());
      dispatch(ClearAllProductState());
      // dispatch(ClearAllProductInputState());
    }
    navigate("/login");
  }, 1000);

  return <h1>---------------NOT AUTHORIZED---------------</h1>;
};

export default UnAuthorize;
