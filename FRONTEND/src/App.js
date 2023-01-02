import "./App.css";
import "../src/styles/login_register.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Protected from "./Pages/Protected";
import Navbar from "./components/Navbar";

function App() {
  /**-------------------------------------------------------------------- */

  /**-------------------------------------------------------------------- */

  return (
    <>
      {/* <main> */}
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/protected"
            element={
              <Protected>
                <Navbar />

                <Dashboard />
              </Protected>
            }
          />

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
