import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import './Hero.css';

const Hero = () => {
  const splineRef = useRef(null);

  const onLoad = (splineApp) => {
    // Store the Spline app instance for potential interactions
    splineRef.current = splineApp;
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title animate-text-1">
            Hi! I'm <span className="highlight">Keat Yee</span>
          </h1>
          <h2 className="hero-subtitle animate-text-2">A Computer Science student at Sunway University</h2>
          <div className="hero-buttons animate-text-3">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
        <div className="hero-visual">
          <div 
            className="spline-container"
            onMouseEnter={() => {
              const cursor = document.querySelector('.custom-cursor');
              cursor?.classList.add('face-hover');
            }}
            onMouseLeave={() => {
              const cursor = document.querySelector('.custom-cursor');
              cursor?.classList.remove('face-hover');
            }}
          >
            <Spline
              scene="https://prod.spline.design/pp-zy1ja3UVWvsTC/scene.splinecode"
              onLoad={onLoad}
              style={{ 
                background: 'transparent',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;