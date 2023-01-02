import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Password from "../components/Password";

import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../utils/Local-Storage";

import {
  loginUser,
  handleFormInput,
  clearUserFormInput,
  logoutUser,
  clearUserToken,
  ClearAllProfileState,
  ClearAllProductState,
} from "../Redux/index";

const Login = () => {
  const { tokenLog, loginUsername, loginPassword } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearUserToken());
    dispatch(ClearAllProfileState());
    dispatch(ClearAllProductState());

    return console.log("Login page entered");
  }, []);

  const handleLogin = async () => {
    dispatch(loginUser({ loginUsername, loginPassword }));
    dispatch(clearUserFormInput());
  };

  useEffect(() => {
    if (tokenLog) {
      setTimeout(() => {
        navigate("/protected");
      }, 1200);
    }
    return () => {
      console.log("Token checked and navigate to protected");
    }; // eslint-disable-next-line
  }, [tokenLog]);

  const handleInput = (event) => {
    const { name, value } = event.target;

    dispatch(handleFormInput({ name, value }));
  };
  return (
    <main className="container ">
      <div className="login-card">
        <div>
          <h2>Login</h2>
          <h3>Enter your credentials</h3>

          <form className="login-form">
            <div className="textbox">
              <input
                // autoComplete="off"
                className="input"
                type="text"
                value={loginUsername}
                required
                name="loginUsername"
                onChange={handleInput}
              />
              <label>Name</label>
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <Password
              placeholder="Password"
              name="loginPassword"
              handleInput={handleInput}
              value={loginPassword}
            />

            <p>
              Signed up already?
              <Link to="/">
                <b>Create your account</b>
              </Link>
            </p>

            <button
              className="control"
              type="button"
              disabled={!loginUsername || !loginPassword}
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
