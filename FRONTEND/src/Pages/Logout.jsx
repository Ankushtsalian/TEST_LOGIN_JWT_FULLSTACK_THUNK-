import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ClearAllProductState,
  ClearAllProfileState,
  clearUserToken,
} from "../Redux/index";

const Logout = () => {
  const { tokenLog } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUserToken());
    dispatch(ClearAllProfileState());
    dispatch(ClearAllProductState());
  };

  useEffect(() => {
    if (!tokenLog) {
      navigate("/login");
    }
    return () => {
      console.log("LOGOUT");
    };
    // eslint-disable-next-line
  }, [tokenLog]);

  return (
    <button className="log-out" onClick={handleLogout}>
      Sign out
    </button>
  );
};

export default Logout;
