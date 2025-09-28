import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>&copy; 2025 Keat Yee. All rights reserved.</p>
            <p>Built with React & Vite • Deployed with GitHub Actions</p>
          </div>
          <div className="footer-links">
            <a href="#home">Back to Top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;