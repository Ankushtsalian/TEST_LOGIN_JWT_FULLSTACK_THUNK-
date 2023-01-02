import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../Redux";
import { getTokenFromLocalStorage } from "../utils/Local-Storage";

const Protected = ({ children }) => {
  const { errorStatusCode: userError, tokenLog } = useSelector(
    (state) => state.user
  );
  const { errorStatusCode: profileError } = useSelector(
    (state) => state.profile
  );
  const { errorStatusCode: productError } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userError === 401 || profileError === 401 || productError === 401) {
      dispatch(logoutUser());
      setTimeout(() => {
        alert(
          "=========================UNAUTHORIZED-LOGIN-----=============--------- PLEASE LOGIN AGAIN.........."
        );
      }, 2000);
    }
    return console.log("PROTECTED");
  }, [productError]);

  if (userError || profileError || productError || !tokenLog) {
    console.log(
      ".............................NAVIGATING. protected...................................."
    );

    return <Navigate to="/login" />;
  }

  return <div className="container">{children}</div>;
};

export default Protected;
