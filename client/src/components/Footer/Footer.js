import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../../styles/main.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/logo1.png" alt="Company Logo" className="footer-logo-img" />
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="https://aptitudeguru.in/#about-us">About Us</a></li>
            <li><a href="https://aptitudeguru.in/#our-services">Our Services</a></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Aptitude Guru Hem</p>
            <p>Chennai, Tamil Nadu</p>
            <p>Phone: +91 9176120906</p>
            <p>Website: <a href="https://www.aptitudeguru.in/" target="_blank" rel="noopener noreferrer">www.aptitudeguru.in</a></p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your <span>Aptitude Guru Hem.</span> All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;