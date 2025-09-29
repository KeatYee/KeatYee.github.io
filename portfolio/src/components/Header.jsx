import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId.replace('#', ''));
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h2>Keat Yee</h2>
        </div>
        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); smoothScrollTo('#home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); smoothScrollTo('#about'); }}>About</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); smoothScrollTo('#projects'); }}>Projects</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); smoothScrollTo('#skills'); }}>Skills</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); smoothScrollTo('#contact'); }}>Contact</a></li>
          </ul>
        </nav>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;