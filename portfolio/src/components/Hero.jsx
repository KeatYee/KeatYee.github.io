import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const textToType = "A Computer Science student at Sunway University";

  useEffect(() => {
    const handleTyping = () => {
      const fullText = textToType;
      
      if (!isDeleting) {
        // Typing
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(100);

        if (displayText === fullText) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(50);

        if (displayText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="hero">
      <div className="container">
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
    </section>
  );
};

export default Hero;