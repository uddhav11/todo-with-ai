import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <>
      <Router>
        <Routes>
          {user ? (
            <Route path="/" element={<Navigate to="/dashboard" />} />
          ) : (
            <Route path="/dashboard" element={<Navigate to="/" />} />
          )}

          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
