import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from 'axios';

function GoogleOAuth() {
  const handleSuccess = async (response) => {
    const tokenId = response.tokenId;
    try {
      await axios.post("https://task-manger-task.onrender.com/api/google-login", { tokenId });
      alert("Google Login Successful");
    } catch (err) {
      alert("Google Login Failed");
    }
  };

  const handleFailure = (error) => {
    alert("Google Login Failed");
  };

  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Login with Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy="single_host_origin"
    />
  );
}

export default GoogleOAuth;
