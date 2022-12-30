import "./App.css";
import "../src/styles/login_register.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Protected from "./Pages/Protected";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { handleFormInput } from "./Redux/User-store/User-Slice";
function App() {
  // const [formInput, setFormInput] = useState({
  //   loginUsername: "",
  //   loginPassword: "",
  //   registerUsername: "",
  //   registerPassword: "",
  //   registerResetPassword: "",
  // });
  const {
    loginUsername,
    loginPassword,
    registerUsername,
    registerPassword,
    registerResetPassword,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const formInput = {
    loginUsername,
    loginPassword,
    registerUsername,
    registerPassword,
    registerResetPassword,
  };
  /**-------------------------------------------------------------------- */
  const [isClosed, setIsClosed] = useState(false);

  /**-------------------------------------------------------------------- */
  const handleInput = (e) => {
    const { name, value } = e.target;

    dispatch(handleFormInput({ name, value }));

    // setFormInput((formValue) => ({ ...formValue, [name]: value }));
  };
  console.log(formInput);
  return (
    <>
      {/* <main> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Register
                handleInput={handleInput}
                formInput={formInput}
                // setFormInput={setFormInput}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                handleInput={handleInput}
                formInput={formInput}
                // setFormInput={setFormInput}
              />
            }
          />

          <Route
            path="/protected"
            element={
              <Protected>
                <Navbar isClosed={isClosed} setIsClosed={setIsClosed} />

                <Dashboard isClosed={isClosed} />
              </Protected>
            }
          ></Route>

          <Route
            path="*"
            element={<h1>-------------------- NOT FOUND 404 --------------</h1>}
          />
        </Routes>
      </Router>
      {/* </main> */}
    </>
  );
}

export default App;
