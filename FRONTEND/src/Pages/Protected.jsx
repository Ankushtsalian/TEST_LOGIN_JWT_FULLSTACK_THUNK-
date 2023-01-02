import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { getTokenFromLocalStorage } from "../utils/Local-Storage";
import Dashboard from "./Dashboard";

import UnAuthorize from "./UnAuthorize";

const Protected = () => {
  const { errorStatusCode: userError } = useSelector((state) => state.user);
  const { errorStatusCode: profileError } = useSelector(
    (state) => state.profile
  );
  const { errorStatusCode: productError } = useSelector(
    (state) => state.product
  );
  console.log("userError", userError);
  console.log("profileError", profileError);
  console.log("productError", productError);
  if (
    userError ||
    profileError ||
    productError ||
    !getTokenFromLocalStorage()
  ) {
    console.log("UNAUTH", getTokenFromLocalStorage());
    return <UnAuthorize />;
  }
  if (
    !userError &&
    !profileError &&
    !productError &&
    getTokenFromLocalStorage()
  ) {
    console.log("CHILDREN", getTokenFromLocalStorage());
    return (
      <div className="container">
        <Navbar />
        <Dashboard />
      </div>
    );
  }
};

export default Protected;
