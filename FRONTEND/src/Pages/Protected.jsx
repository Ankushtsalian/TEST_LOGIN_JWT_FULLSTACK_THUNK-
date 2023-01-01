import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  ClearAllProductState,
  ClearAllProfileState,
  clearUserToken,
} from "../Redux";

import UnAuthorize from "./UnAuthorize";

const Protected = ({ children }) => {
  const { errorStatusCode: userError } = useSelector((state) => state.user);
  const { errorStatusCode: profileError } = useSelector(
    (state) => state.profile
  );
  const { errorStatusCode: productError } = useSelector(
    (state) => state.product
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("Token");
  // useEffect(() => {
  // if (!token) {
  //   navigate("/login");
  // }
  if (userError === 401 || profileError === 401 || productError === 401) {
    dispatch(clearUserToken());
    dispatch(ClearAllProfileState());
    dispatch(ClearAllProductState());
  }

  return (
    <div className="container">
      {userError !== 401 || profileError !== 401 || productError !== 401 ? (
        <>{children}</>
      ) : (
        <UnAuthorize />
      )}
    </div>
  );
};

export default Protected;
