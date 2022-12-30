import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../Redux/User-store/User-Slice";
import { removeTokenFromLocalStorage } from "../utils/Local-Storage";

const Logout = () => {
  const { tokenLog } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
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
    <>
      <button className="log-out" onClick={handleLogout}>
        Sign out
      </button>
    </>
  );
};

export default Logout;
