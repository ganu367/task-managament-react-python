import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "",
        username: username,
        password: password,
        scope: "",
        client_id: "",
        client_secret: "",
      }),
      credentials: "include",
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        requestOptions
      );

      if (response.status === 200) {
        const data = await response.json();
        navigate("/dashboard");

        document.getElementById("success-message").innerHTML = "Welcome!";
        document.getElementById("success-message").classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("success-message").classList.add("hidden");
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail);
        document.getElementById("error-message").classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("error-message").classList.add("hidden");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="main_div">
      <div className="title">Login</div>
      <div id="success-message" className="hidden"></div>
      <div id="error-message" className="hidden">
        {errorMessage}
      </div>

      <form onSubmit={handleSubmit} id="login-form">
        <div className="input_box">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            placeholder="Enter a username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="btn-submit option_div">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
