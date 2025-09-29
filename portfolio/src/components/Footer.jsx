import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Footer.css';

const Footer = () => {
  const [footerRef, footerVisible] = useScrollAnimation({ threshold: 0.5 });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div 
          ref={footerRef}
          className={`footer-content fade-in-up ${footerVisible ? 'visible' : ''}`}
        >
          <div className="footer-text">
            <p>&copy; 2025 Keat Yee. All rights reserved.</p>
            <p>Built with React & Vite • Deployed with GitHub Actions</p>
          </div>
          <div className="footer-links">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;