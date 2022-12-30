import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import Password from "../components/Password";
import customFetch from "../utils/Axios";
import authHeader from "../utils/Auth-Header";
import {
  addTokenToLocalStorage,
  removeProfileFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../utils/Local-Storage";

const Login = ({ handleInput, formInput, setFormInput }) => {
  const { loginUsername, loginPassword } = formInput;
  const [token, setToken] = useState({ tokenLog: "", tokenDecoded: {} });

  const navigate = useNavigate();

  const { tokenLog, tokenDecoded } = token;
  useEffect(() => {
    removeTokenFromLocalStorage("Token");
    removeProfileFromLocalStorage("profile");

    return console.log("done login");
  }, []);

  const handleLogin = async () => {
    try {
      const response = await customFetch.post(
        "/login",
        formInput,
        authHeader()
      );

      setToken((responseToken) => ({
        ...responseToken,
        tokenLog: response.data.msg.token,
        // tokenDecoded: response.data.msg.decoded,
      }));
      setFormInput((formValue) => ({
        ...formValue,

        loginUsername: "",
        loginPassword: "",
        registerUsername: "",
        registerPassword: "",
        registerResetPassword: "",
      }));
      // if (token) navigate("/protected");

      setTimeout(() => {
        alert(
          `Login Successfull with username : ${response.data.msg.username}`
        );
        toast.success("DONE");
      }, 250);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (tokenLog) {
      addTokenToLocalStorage(tokenLog);
      // localStorage.setItem("Token", tokenLog);
      navigate("/protected");
    }

    return () => {
      console.log("LOGIN");
    }; // eslint-disable-next-line
  }, [tokenLog]);

  return (
    <main className="container ">
      <div className="login-card">
        <div>
          <h2>Login</h2>
          <h3>Enter your credentials</h3>

          <form className="login-form">
            <div className="textbox">
              <input
                className="input"
                type="text"
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
