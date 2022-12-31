import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClearAllState } from "../Redux/Profile-Store/Profile-Slice";

const UnAuthorize = () => {
  //   const { ClearAllState } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  //   useEffect(() => {
  //     // if (!token) {

  //     // }
  //     return console.log("PROTECTED ROUTE ENTERED");
  //   }, [token]);

  setTimeout(() => {
    dispatch(ClearAllState());
    return navigate("/login");
  }, 2000);

  return <h1>---------------NOT AUTHORIZED---------------</h1>;
};

export default UnAuthorize;
