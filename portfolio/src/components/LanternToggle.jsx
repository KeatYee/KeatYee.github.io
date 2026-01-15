import React, { useState, useRef } from 'react';
import './LanternToggle.css';

const LanternToggle = ({ isDarkMode, onToggle }) => {
  const [isSwinging, setIsSwinging] = useState(false);
  const lanternRef = useRef(null);

  const handleClick = () => {
    setIsSwinging(true);
    onToggle();
    
    // Reset animation after completion
    setTimeout(() => {
      setIsSwinging(false);
    }, 600);
  };

  return (
    <button
      className={`lantern-toggle ${isSwinging ? 'swinging' : ''}`}
      onClick={handleClick}
      aria-label="Toggle theme"
      ref={lanternRef}
    >
      {/* Lantern String */}
      <div className="lantern-string"></div>
      
      {/* Main Lantern Body */}
      <svg
        className={`lantern-svg ${isDarkMode ? 'lit' : 'unlit'}`}
        viewBox="0 0 80 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top handle */}
        <path
          d="M 20 5 Q 20 0 25 0 Q 30 0 30 5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="lantern-handle"
        />
        
        {/* Top cap */}
        <rect x="15" y="8" width="50" height="4" rx="2" className="lantern-cap" />
        
        {/* Main body (trapezoid shape) */}
        <path
          d="M 15 12 L 10 75 Q 10 85 20 85 L 60 85 Q 70 85 70 75 L 65 12 Z"
          className="lantern-body"
          strokeWidth="1.5"
        />
        
        {/* Glass panels - left */}
        <path
          d="M 20 20 L 18 80"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
          className="lantern-panel"
        />
        
        {/* Glass panels - center left */}
        <path
          d="M 33 15 L 30 80"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
          className="lantern-panel"
        />
        
        {/* Glass panels - center right */}
        <path
          d="M 47 15 L 50 80"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
          className="lantern-panel"
        />
        
        {/* Glass panels - right */}
        <path
          d="M 60 20 L 62 80"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
          className="lantern-panel"
        />
        
        {/* Bottom cap */}
        <ellipse cx="40" cy="85" rx="25" ry="5" className="lantern-cap" />
        
        {/* Inner glow (appears in dark mode) */}
        <circle
          cx="40"
          cy="50"
          r="18"
          className="lantern-glow"
          opacity={isDarkMode ? "0.8" : "0"}
        />
      </svg>
      
      {/* Ambient glow effect (dark mode only) */}
      <div className={`lantern-ambient-glow ${isDarkMode ? 'visible' : ''}`}></div>
    </button>
  );
};

export default LanternToggle;
