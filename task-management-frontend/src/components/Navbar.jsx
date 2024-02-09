import React from "react";
import "./Navbar.css";

const Navbar = ({ onLoginClick, onSignupClick }) => {
  return (
    <>
      <nav className="navbar">
      <a className="navbar-brands" href="/">
        Auto<span>t</span>ask </a>
        <ul className="navbar-navs">
          <li className="nav-items">
            <button className="btns nav-links" onClick={onLoginClick}>
              Login
            </button>
          </li>
          <li className="nav-items">
            <button className="btns nav-links" onClick={onSignupClick}>
              Sign Up
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;