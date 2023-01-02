import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/index";

const Logout = () => {
  const { tokenLog } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    // if (!tokenLog) {
    console.log(
      "-============================================LOGOUT=---------------------------------------"
    );
    navigate("/login");
  };

  // useEffect(() => {

  //   return () => {
  //     console.log("LOGOUT");
  //   };
  //   // eslint-disable-next-line
  // }, [tokenLog]);

  return (
    <button className="log-out" onClick={handleLogout}>
      Sign out
    </button>
  );
};

export default Logout;
