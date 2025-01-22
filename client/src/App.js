import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './Pages/HomePage/HomePage';
import Post from './Pages/PostPage/PostPage';
import Tasks  from './Pages/TaskPage/TaskPage';

import Register from "./Pages/UserPage/Signup/UserRegister";
import Login from "./Pages/UserPage/Loginpage/UserLogin";
import ForgotPassword from "./Pages/UserPage/Forgot/UserForgot";
import GoogleOAuth from "./Pages/UserPage/Forgot/userGoogle";




const App = () => {
  return (
    <Router>
      
      <main>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/tasks" element={<Tasks />} />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/google-login" element={<GoogleOAuth />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
