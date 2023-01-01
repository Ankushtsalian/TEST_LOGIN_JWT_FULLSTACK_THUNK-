import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ClearAllProductState,
  ClearAllProfileState,
  clearUserToken,
} from "../Redux/index";
import { getTokenFromLocalStorage } from "../utils/Local-Storage";

const UnAuthorize = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    alert("UNAUTHORIZED USER, Please login");

    if (getTokenFromLocalStorage()) {
      console.log("UNAUTHORIZED USER, Please login");
      dispatch(clearUserToken());
      dispatch(ClearAllProfileState());
      dispatch(ClearAllProductState());
    }
    navigate("/login");
    return console.log("UNAUTHORIZED USER, Please login OUT");
  }, []);

  return <h1>---------------NOT AUTHORIZED---------------</h1>;
};

export default UnAuthorize;
