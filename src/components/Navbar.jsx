import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const storedUserName = localStorage.getItem("userName");
  const handleSignOut = () => {
    localStorage.removeItem("userName");
    navigate("/signup");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          Health Xone
        </div>

        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact Us
          </Link>
          <Link to="/all-patients" onClick={() => setIsMenuOpen(false)}>
            Patients
          </Link>
          <Link to="/all-doctors" onClick={() => setIsMenuOpen(false)}>
            Doctors
          </Link>

          {storedUserName ? (
            <div className="profile">
              <span>Welcome, {storedUserName}!</span>
              <button onClick={handleSignOut} className="signout-btn">
                Sign Out
              </button>
            </div>
          ) : (
            <>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
            </>

          )}
        </div>
      </nav>
      <br/><br/><br/><br/><br/>
    </>
  );
};
