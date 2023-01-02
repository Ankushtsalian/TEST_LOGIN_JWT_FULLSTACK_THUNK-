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

  console.log("userError", userError);
  console.log("profileError", profileError);
  console.log("productError", productError);
  // if (
  //   userError ||
  //   profileError ||
  //   productError ||
  //   !getTokenFromLocalStorage()
  // ) {
  //
  //    return <UnAuthorize />;
  // }

  // useEffect(() => {
  //   if (
  //     String(userError) === "401" ||
  //     String(profileError) === "401" ||
  //     String(productError) === "401" ||
  //     !getTokenFromLocalStorage()
  //   ) {
  //     navigate("/login");
  //     dispatch(logoutUser());
  //   }

  //   return () => {
  //     console.log("UNAUTH", getTokenFromLocalStorage());
  //   };
  // }, []);

  // if (
  //   !userError &&
  //   !profileError &&
  //   !productError &&
  //   getTokenFromLocalStorage()
  // ) {
  //   console.log("CHILDREN", getTokenFromLocalStorage());

  // }
  useEffect(() => {
    if (
      userError ||
      profileError ||
      productError
      //  ||
      // !getTokenFromLocalStorage()
    ) {
      dispatch(logoutUser());
    }
    return console.log(
      "=========================UNAUTHORIZED------=============---------",
      getTokenFromLocalStorage()
    );
  }, []);
  if (userError || profileError || productError || !tokenLog) {
    console.log(
      ".............................NAVIGATING. protected...................................."
    );

    return <Navigate to="/login" />;
  }

  return <div className="container">{children}</div>;
};

export default Protected;
