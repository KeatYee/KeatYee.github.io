import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const splineRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (splineRef.current && pathRef.current) {
        const rect = splineRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / window.innerHeight) * 20;
        const rotateY = (mouseX / window.innerWidth) * 20;
        
        splineRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Update spline path based on mouse position
        const intensity = Math.min(Math.abs(mouseX) + Math.abs(mouseY), 100) / 100;
        const newPath = `M50,200 Q${150 + mouseX * 0.1},${50 + mouseY * 0.1} 250,${200 + intensity * 30} T${350 + mouseX * 0.05},${150 + mouseY * 0.08}`;
        pathRef.current.setAttribute('d', newPath);
      }
    };

    const handleMouseLeave = () => {
      if (splineRef.current && pathRef.current) {
        splineRef.current.style.transform = 'rotateX(10deg) rotateY(15deg)';
        pathRef.current.setAttribute('d', 'M50,200 Q150,50 250,200 T350,150');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
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
        <div className="hero-visual">
          <div className="spline-container" ref={splineRef}>
            <svg className="spline-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="splineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path 
                ref={pathRef}
                className="spline-path"
                d="M50,200 Q150,50 250,200 T350,150"
                stroke="url(#splineGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
              />
            </svg>
            <div className="spline-nodes">
              <div className="node node-1"></div>
              <div className="node node-2"></div>
              <div className="node node-3"></div>
              <div className="node node-4"></div>
            </div>
            <div className="spline-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;