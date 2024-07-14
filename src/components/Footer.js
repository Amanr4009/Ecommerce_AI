import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Ecommerce. All rights reserved.</p>
      <ul>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact Us</a></li>
        <li><a href="#terms">Terms & Conditions</a></li>
      </ul>
      <div className="social-media">
        <a href="#facebook">Facebook</a>
        <a href="#twitter">Twitter</a>
        <a href="#instagram">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
