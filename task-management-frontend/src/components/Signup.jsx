import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
  
    try {
      const data = {
        name: name,
        username: username,
        password: password,
        confirm_password: confirmPassword,
      };
  
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        document.getElementById("success-message").innerHTML = "Welcome!";
        document.getElementById("success-message").classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("success-message").classList.add("hidden");
        }, 3000);
      } else {
        setErrorMessage(responseData.detail);
        document.getElementById("error-message").classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("error-message").classList.add("hidden");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
    <div className="main_div">
      <div className="title">Sign Up</div>
      <div id="success-message" className="hidden"></div>
      <div id="error-message">{errorMessage}</div>

      <form onSubmit={handleSubmit} id="sign-up-form">
        <div className="input_box">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)} required
          />
        </div>
        <div className="input_box">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            placeholder="Enter a username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} required
          />
        </div>
        <div className="input_box">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            placeholder="Enter a password"
            id="pass"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
          {/* Add password visibility toggle icons if needed */}
        </div>
        <div className="input_box">
          <label htmlFor="re-pass">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            id="re-pass"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required
          />
          {/* Add password visibility toggle icons if needed */}
        </div>
        <div className="btn-submit">
          <button type="submit" className="btn">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
