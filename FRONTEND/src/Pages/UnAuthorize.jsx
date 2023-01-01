import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ClearAllProductState,
  ClearAllProfileInputState,
  ClearAllState,
  clearToken,
  clearUserFormInput,
} from "../Redux/index";

const UnAuthorize = () => {
  //   const { ClearAllState } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // useEffect(() => {
  //   return console.log("PROTECTED ROUTE ENTERED");
  // }, []);

  setTimeout(() => {
    // dispatch(ClearAllState());
    dispatch(clearUserFormInput());
    dispatch(clearToken());
    dispatch(ClearAllState());
    dispatch(ClearAllProductState());
    dispatch(ClearAllProfileInputState());
    navigate("/login");
  }, 2000);

  return <h1>---------------NOT AUTHORIZED---------------</h1>;
};

export default UnAuthorize;
