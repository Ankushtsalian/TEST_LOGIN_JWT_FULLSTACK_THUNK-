import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ClearAllProductState,
  ClearAllProfileState,
  clearUserToken,
} from "../Redux/index";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../utils/Local-Storage";

const UnAuthorize = () => {
  const { errorStatusCode: userError } = useSelector((state) => state.user);
  const { errorStatusCode: profileError } = useSelector(
    (state) => state.profile
  );
  const { errorStatusCode: productError } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const errorvalue = {
    userError: userError,
    profileError: profileError,
    productError: productError,
  };
  const error = userError || profileError || productError;
  useEffect(() => {
    removeTokenFromLocalStorage();

    if (error) {
      dispatch(clearUserToken());
      dispatch(ClearAllProductState());
      dispatch(ClearAllProfileState());
    }
    navigate("/login");
    alert("UNAUTHORIZED USER, Please login unauth");
    console.log("UNAUTHORIZED USER, Please login OUT");
  }, [error]);

  return <h1>---------------NOT AUTHORIZED---------------</h1>;
};

export default UnAuthorize;
