import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <p className="hero-greeting animate-text-1">Hi! I'm</p>
          <h1 className="hero-name animate-text-2">
            <span className="highlight">Loke Keat Yee</span>
          </h1>
          <p className="hero-subtitle animate-text-3">A Computer Science student at Sunway University</p>
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