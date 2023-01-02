import { Link, useNavigate } from "react-router-dom";
import Password from "../components/Password";
import { useDispatch, useSelector } from "react-redux";

import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../utils/Local-Storage";
import { useEffect } from "react";
import {
  handleFormInput,
  clearUserFormInput,
  clearUserToken,
  registerUser,
  ClearAllProfileState,
  ClearAllProductState,
  logoutUser,
} from "../Redux/index";
const Register = () => {
  const {
    tokenLog,
    registerUsername,
    registerPassword,
    registerResetPassword,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  /**----------------------------------------------------------------------------
   * CLEAR
   * ------------------------------------------------------------------------------------------ */
  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      removeTokenFromLocalStorage();
      dispatch(logoutUser());
      // dispatch(clearUserToken());
      // dispatch(ClearAllProfileState());
      // dispatch(ClearAllProductState());
    }
    return console.log("Register page entered");
  }, []);
  /**----------------------------------------------------------------------------
   * CLEAR
   * ------------------------------------------------------------------------------------------ */
  const handleRegister = async () => {
    dispatch(
      registerUser({
        username: registerUsername,
        password: registerPassword,
      })
    );
    dispatch(clearUserFormInput());
  };
  useEffect(() => {
    if (tokenLog) {
      setTimeout(() => {
        navigate("/protected");
      }, 2000);
    }
    return () => {
      console.log("Register Token checked and navigate to protected");
    }; // eslint-disable-next-line
  }, [tokenLog]);

  const handleInput = (event) => {
    const { name, value } = event.target;

    dispatch(handleFormInput({ name, value }));
  };

  return (
    <main className="container ">
      <div className="register-card">
        <div>
          <h2>Register</h2>
          <h3>Enter your credentials</h3>
          <form className="register-form">
            <div className="textbox">
              <input
                className="input"
                type="text"
                required
                name="registerUsername"
                value={registerUsername}
                onChange={handleInput}
              />
              <label>Username</label>
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <Password
              placeholder="Password"
              name="registerPassword"
              value={registerPassword}
              handleInput={handleInput}
            />
            <Password
              placeholder="Re-Enter-password"
              name="registerResetPassword"
              value={registerResetPassword}
              handleInput={handleInput}
            />

            <button
              className="control"
              type="button"
              disabled={
                !registerUsername || !registerPassword || !registerResetPassword
              }
              onClick={handleRegister}
            >
              REGISTER
            </button>
          </form>
        </div>
        <div className="Redirect">
          <div>Already have an account?</div>
          <Link to="/login">
            &#x2190; <span>Sign In</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
