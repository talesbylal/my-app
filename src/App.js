import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import DashboardPage from "./component/DashboardPage";
import RegistrationPage from "./component/RegistrationPage";
import NavBar from "./component/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem("jwtToken");
    // Check if user is already logged out
    if (!localStorage.jwtToken) {
      setIsLoggedIn(false);
    }
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
