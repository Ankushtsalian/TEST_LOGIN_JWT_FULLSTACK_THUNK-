import "./App.css";
import "../src/styles/login_register.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Protected from "./Pages/Protected";
import Navbar from "./components/Navbar";
import Mail from "./components/Mail";

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

          <Route path="/protected" element={<Protected />}>
            <Route path="home" element={<Navbar />}>
              <Route path="" element={<Dashboard />} />
              <Route path="mail" element={<Mail />} />
            </Route>
          </Route>
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
