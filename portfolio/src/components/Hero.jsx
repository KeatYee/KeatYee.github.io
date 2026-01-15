import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [scrollY, setScrollY] = useState(0);

  const textToType = "A Computer Science student at Sunway University";

  // Spotlight effect on name hover (trail removed)
  useEffect(() => {
    const nameElement = document.querySelector('.hero-name');
    const highlightSpan = document.querySelector('.hero-name .highlight');
    let isHovering = false;

    const handleMouseMove = (e) => {
      if (!isHovering || !highlightSpan) return;
      
      // Update spotlight position only
      const rect = highlightSpan.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      highlightSpan.style.setProperty('--mouse-x', x + 'px');
      highlightSpan.style.setProperty('--mouse-y', y + 'px');
    };

    const handleMouseEnter = () => {
      isHovering = true;
      if (highlightSpan) {
        highlightSpan.classList.add('spotlight-active');
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      if (highlightSpan) {
        highlightSpan.classList.remove('spotlight-active');
      }
    };

    if (nameElement) {
      nameElement.addEventListener('mouseenter', handleMouseEnter);
      nameElement.addEventListener('mousemove', handleMouseMove);
      nameElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (nameElement) {
        nameElement.removeEventListener('mouseenter', handleMouseEnter);
        nameElement.removeEventListener('mousemove', handleMouseMove);
        nameElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Smooth Parallax scroll effect with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const updateScrollY = () => {
      lastScrollY = window.scrollY;
      setScrollY(lastScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollY);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = textToType;
      
      if (!isDeleting) {
        // Typing
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(50);

        if (displayText === fullText) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(25);

        if (displayText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, textToType]);

  return (
    <section id="home" className="hero">
      <div 
        className="hero-background-layer"
        style={{
          transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
          opacity: 1 - scrollY / 800,
          transition: 'transform 0.1s ease-out, opacity 0.15s ease-out'
        }}
      ></div>
      <div 
        className="container"
        style={{
          transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
          opacity: 1 - scrollY / 600,
          transition: 'transform 0.1s ease-out, opacity 0.15s ease-out'
        }}
      >
        <div className="hero-content">
          <p className="hero-greeting animate-text-1">Hi! I'm</p>
          <h1 className="hero-name animate-text-2">
            <span className="highlight">Loke Keat Yee</span>
          </h1>
          <p className="hero-subtitle animate-text-3 typing-effect-continuous">
            {displayText}
            <span className="cursor-blink">|</span>
          </p>
          <div className="hero-buttons animate-text-4">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
      </div>
      <a 
        href="#about" 
        className="scroll-down" 
        aria-label="Scroll down" 
        style={{
          transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
          opacity: 1 - scrollY / 400,
          transition: 'transform 0.1s ease-out, opacity 0.15s ease-out'
        }}
        onClick={(e) => {
        e.preventDefault();
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </a>
    </section>
  );
};

export default Hero;