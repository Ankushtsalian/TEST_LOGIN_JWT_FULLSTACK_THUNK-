import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import UnAuthorize from "./UnAuthorize";

const Protected = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    return console.log("PROTECTED ROUTE ENTERED");
  }, [token]);

  return (
    <div className="container">{token ? <>{children}</> : <UnAuthorize />}</div>
  );
};

export default Protected;
