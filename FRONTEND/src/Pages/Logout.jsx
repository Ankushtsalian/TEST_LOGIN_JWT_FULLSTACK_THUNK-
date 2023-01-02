import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/index";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());

    console.log(
      "-============================================LOGOUT=---------------------------------------"
    );
    navigate("/login");
  };

  return (
    <button className="log-out" onClick={handleLogout}>
      Sign out
    </button>
  );
};

export default Logout;
