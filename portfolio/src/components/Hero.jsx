import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const splineRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (splineRef.current) {
        const rect = splineRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // 3D face rotation
        const rotateX = (mouseY / window.innerHeight) * 15;
        const rotateY = (mouseX / window.innerWidth) * 15;
        
        splineRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Eye tracking
        const eyes = splineRef.current.querySelectorAll('.pupil');
        const eyeMoveX = (mouseX / window.innerWidth) * 8;
        const eyeMoveY = (mouseY / window.innerHeight) * 8;
        
        eyes.forEach(eye => {
          eye.style.transform = `translate(${eyeMoveX}px, ${eyeMoveY}px)`;
        });
        
        // Mouth expression based on mouse position
        const mouth = splineRef.current.querySelector('.mouth-curve');
        const intensity = Math.min(Math.abs(mouseX) + Math.abs(mouseY), 150) / 150;
        const smileIntensity = intensity * 10;
        
        if (mouth) {
          mouth.style.transform = `scaleX(${1 + intensity * 0.2}) translateY(${-smileIntensity}px)`;
        }
      }
    };

    const handleMouseLeave = () => {
      if (splineRef.current) {
        splineRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
        
        const eyes = splineRef.current.querySelectorAll('.pupil');
        eyes.forEach(eye => {
          eye.style.transform = 'translate(0px, 0px)';
        });
        
        const mouth = splineRef.current.querySelector('.mouth-curve');
        if (mouth) {
          mouth.style.transform = 'scaleX(1) translateY(0px)';
        }
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
          <div className="face-container" ref={splineRef}>
            <div className="face-3d">
              {/* Face outline */}
              <div className="face-shape">
                {/* Eyes */}
                <div className="eyes">
                  <div className="eye left-eye">
                    <div className="eyeball">
                      <div className="pupil"></div>
                      <div className="highlight"></div>
                    </div>
                  </div>
                  <div className="eye right-eye">
                    <div className="eyeball">
                      <div className="pupil"></div>
                      <div className="highlight"></div>
                    </div>
                  </div>
                </div>
                
                {/* Nose */}
                <div className="nose"></div>
                
                {/* Mouth */}
                <div className="mouth">
                  <div className="mouth-curve"></div>
                </div>
                
                {/* Face features */}
                <div className="cheek left-cheek"></div>
                <div className="cheek right-cheek"></div>
              </div>
              
              {/* Hair/Top */}
              <div className="hair"></div>
              
              {/* Floating elements around face */}
              <div className="face-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;