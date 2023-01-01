import { useDispatch, useSelector } from "react-redux";

// import { useNavigate } from "react-router-dom";
// import {
//   ClearAllProductState,
//   ClearAllProfileState,
//   clearUserToken,
// } from "../Redux";
// import { getTokenFromLocalStorage } from "../utils/Local-Storage";

import UnAuthorize from "./UnAuthorize";

const Protected = ({ children }) => {
  const { errorStatusCode: userError } = useSelector((state) => state.user);
  const { errorStatusCode: profileError } = useSelector(
    (state) => state.profile
  );
  const { errorStatusCode: productError } = useSelector(
    (state) => state.product
  );

  if (userError === 401 || profileError === 401 || productError === 401)
    return <UnAuthorize />;

  return <div className="container">{children}</div>;
};

export default Protected;
