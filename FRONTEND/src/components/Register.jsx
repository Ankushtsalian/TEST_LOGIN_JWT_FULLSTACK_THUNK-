import axios from "axios";
import { Link } from "react-router-dom";
import Password from "./Password";

const Register = ({ formInput, handleInput }) => {
  const { registerUsername, registerPassword, registerResetPassword } =
    formInput;

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/register",
        {
          username: registerUsername,
          password: registerPassword,
        }
      );
      alert(
        `You have successfully registered as : ${response.data.msg.username}, Please try to login`
      );
    } catch (error) {
      alert(error.response.data.msg + " Please try to Sign in");
    }
  };

  return (
    <main className="container ">
      <div className="register-card">
        <div>
          <h2>Register</h2>
          <h3>Enter your credentials</h3>
          <form className="register-form">
            {/* <input
              spellCheck="false"
              className="control"
              name="registerUsername"
              type="text"
              placeholder="Username"
              onChange={handleInput}
            /> */}
            <div className="textbox">
              <input
                className="input"
                type="text"
                required
                name="registerUsername"
                onChange={handleInput}
              />
              <label>Username</label>
              <span className="material-symbols-outlined">
                {" "}
                account_circle{" "}
              </span>
            </div>
            <Password
              placeholder="Password"
              name="registerPassword"
              handleInput={handleInput}
            />
            <Password
              placeholder="Re-Enter-password"
              name="registerResetPassword"
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
              Register
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
