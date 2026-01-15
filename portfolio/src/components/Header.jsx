import React, { useState, useEffect, useRef } from 'react';
import LanternToggle from './LanternToggle';
import './Header.css';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const switchSoundRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    switchSoundRef.current = new Audio('/switch.wav');
    switchSoundRef.current.volume = 0.3;

    // Check for saved theme preference or default to light (warm theme)
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Check for saved mute preference
    const savedMute = localStorage.getItem('soundMuted') === 'true';
    setIsMuted(savedMute);
    document.documentElement.setAttribute('data-muted', savedMute.toString());

    // Handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    // Play switch sound only if not muted
    if (switchSoundRef.current && !isMuted) {
      switchSoundRef.current.currentTime = 0;
      switchSoundRef.current.play().catch(err => console.log('Audio play failed:', err));
    }

    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleSound = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    document.documentElement.setAttribute('data-muted', newMuteState.toString());
    localStorage.setItem('soundMuted', newMuteState.toString());
    
    // Play a brief confirmation sound when unmuting
    if (!newMuteState && switchSoundRef.current) {
      switchSoundRef.current.currentTime = 0;
      switchSoundRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <ul>
            <li>
              <a href="#home">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Home
              </a>
            </li>
            <li>
              <a href="#about">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"/>
                  <path d="M12 17v4M8 16a4 4 0 0 1 8 0"/>
                  <path d="M6 21h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"/>
                </svg>
                About
              </a>
            </li>
            <li>
              <a href="#projects">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6-6 6 6"/>
                  <rect x="3" y="9" width="18" height="12" rx="2"/>
                  <path d="M9 13v4M15 13v4"/>
                </svg>
                Projects
              </a>
            </li>
            <li>
              <a href="#skills">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.4 14.4L9.6 9.6M18.4 6.4L19.8 5a2 2 0 1 0-2.8-2.8l-1.4 1.4M4.2 20a2 2 0 1 0 2.8 2.8l14.6-14.6a2 2 0 1 0-2.8-2.8L4.2 20z"/>
                </svg>
                Skills
              </a>
            </li>
            <li>
              <a href="#contact">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-controls">
          <button 
            className="sound-toggle" 
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
            )}
          </button>
          <LanternToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Header;