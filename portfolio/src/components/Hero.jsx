import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Hero.css';

const Hero = () => {
  const splineRef = useRef(null);
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.1 });
  const [visualRef, visualVisible] = useScrollAnimation({ threshold: 0.1 });

  const onLoad = (splineApp) => {
    // Store the Spline app instance for potential interactions
    splineRef.current = splineApp;
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div 
          ref={contentRef}
          className={`hero-content fade-in-left ${contentVisible ? 'visible' : ''}`}
        >
          <h1 
            ref={titleRef}
            className={`hero-title fade-in-up ${titleVisible ? 'visible' : ''}`}
          >
            Hi, I'm <span className="highlight">Keat Yee</span>
          </h1>
          <h2 className="hero-subtitle">Full Stack Developer</h2>
          <p className="hero-description">
            I create modern, responsive web applications using cutting-edge technologies. 
            Passionate about clean code, user experience, and innovative solutions.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
        <div 
          ref={visualRef}
          className={`hero-visual fade-in-right ${visualVisible ? 'visible' : ''}`}
        >
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