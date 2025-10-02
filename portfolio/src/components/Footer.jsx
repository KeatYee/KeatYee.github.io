import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approximately 100vh)
      if (window.scrollY > window.innerHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-text">
              <p>&copy; 2025 Keat Yee. All rights reserved.</p>
              <p>Built with <span className="heart">❤️</span> using React & Vite • Hosted on GitHub Pages</p>
            </div>
          </div>
        </div>
      </footer>
      <a 
        href="#home" 
        className={`back-to-top-fixed ${showButton ? 'visible' : ''}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
        <span>To Top</span>
      </a>
    </>
  );
};

export default Footer;