import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Userlogin.css";  // Import the CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://task-manger-task.onrender.com/api/user/login", { email, password });
      localStorage.setItem("token", response.data.token);  // Store JWT
      alert("Login successful");
      navigate("/home");  // Redirect to home page after successful login
    } catch (err) {
      setError(err.response.data.message || "Error");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");  // Redirect to register page
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");  // Redirect to forgot password page
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">Login</button>
        {error && <p className="error-message">{error}</p>}
        <div className="additional-options">
          <button type="button" onClick={handleRegisterClick} className="register-button">
            Register
          </button>
          <button type="button" onClick={handleForgotPasswordClick} className="forgot-password-button">
            Forgot Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
