import React from "react";
// CORRECTED PATH: Removed the extra "components/"
import Button from "../common/Button";
import "./LoginPage.css";

const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login functionality not implemented yet.");
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h2 className="login-title">Admin Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <Button type="submit" variant="primary" className="login-btn">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
