// src/components/Footer.js
import React from "react";
import "./Footer.css"; // Import the CSS file for styling


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          
          <p className="logo-content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum,
            eligendi, voluptatibus deleniti ipsum officiis alias ex impedit.
          </p>
        </div>
        <div className="footer-links">
          <h4 style={{
           
          }}>Important Links</h4>
          <ul>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Terms & Conditions</h4>
          <ul>
            <li>
              <a href="/support">Contact Support</a>
            </li>
          </ul>
          <div className="social-icons">
            <a href="/#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="/#">
              <i className="fab fa-skype"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <hr />
        <p>Copyright © 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
