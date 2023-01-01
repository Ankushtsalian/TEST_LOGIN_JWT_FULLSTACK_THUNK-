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

const UnAuthorize = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // useEffect(() => {
  //   return console.log("PROTECTED ROUTE ENTERED");
  // }, []);

  setTimeout(() => {
    console.log("UNAUTH");
    dispatch(clearUserFormInput());
    dispatch(clearUserToken());
    dispatch(ClearAllProfileState());
    dispatch(ClearAllProductState());
    dispatch(ClearAllProductInputState());
    navigate("/login");
  }, 1000);

  return <h1>---------------NOT AUTHORIZED---------------</h1>;
};

export default UnAuthorize;
