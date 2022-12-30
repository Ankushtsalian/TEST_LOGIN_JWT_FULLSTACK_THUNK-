import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");
  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, [token]);

  return <div className="container">{token && <>{children}</>}</div>;
};

export default Protected;
