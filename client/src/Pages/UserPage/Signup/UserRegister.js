import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://task-manger-task.onrender.com/api/user/register", { name, email, password });
      alert("Registration successful");
      navigate("/login"); // Navigate to the login page after successful registration
    } catch (err) {
      setError(err.response.data.message || "Error");
    }
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "94%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: "#fff",
  };

  const inputFocusStyle = {
    outline: "none",
    borderColor: "#007BFF",
  };

  const buttonStyle = {
    width: "99%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const errorStyle = {
    color: "red",
    textAlign: "center",
  };

  const loginButtonStyle = {
    backgroundColor: "transparent",
    color: "#007BFF",
    border: "1px solid #007BFF",
    padding: "10px 30px",
    borderRadius: "4px",
    textAlign: "center",
    display: "block",
    marginTop: "15px",
    cursor: "pointer",
  };


  return (
    <div style={formStyle}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Register</h2>
        <input
          style={inputStyle}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Register
        </button>
        {error && <p style={errorStyle}>{error}</p>}
      </form>
      <div style={{display:"flex"}}>
      <p style={{marginTop:"30px"}}>  Already have an account?</p>
      <button
        style={loginButtonStyle}
        onClick={() => navigate("/login")}
       
        onMouseLeave={(e) => e.target.style.backgroundColor = loginButtonStyle.backgroundColor}
      >
       Login
      </button>
      </div>
    
    </div>
  );
}

export default Register;
