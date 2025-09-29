import React from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import './About.css';

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.2 });
  const [visibleStats, setStatRef] = useStaggeredAnimation(3, 150);

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 
          ref={titleRef}
          className={`section-title fade-in-up ${titleVisible ? 'visible' : ''}`}
        >
          About Me
        </h2>
        <div className="about-content">
          <div 
            ref={textRef}
            className={`about-text fade-in-left ${textVisible ? 'visible' : ''}`}
          >
            <p>
              I'm a passionate full-stack developer with a love for creating innovative 
              digital experiences. With expertise in modern web technologies, I transform 
              ideas into responsive, user-friendly applications.
            </p>
            <p>
              My journey in web development started with curiosity and has evolved into 
              a career focused on continuous learning and pushing the boundaries of 
              what's possible with code.
            </p>
            <div className="stats">
              <div 
                ref={setStatRef(0)}
                className={`stat stagger-item ${visibleStats.has(0) ? 'visible' : ''}`}
              >
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
              <div 
                ref={setStatRef(1)}
                className={`stat stagger-item ${visibleStats.has(1) ? 'visible' : ''}`}
              >
                <h3>10+</h3>
                <p>Projects Completed</p>
              </div>
              <div 
                ref={setStatRef(2)}
                className={`stat stagger-item ${visibleStats.has(2) ? 'visible' : ''}`}
              >
                <h3>5+</h3>
                <p>Technologies Mastered</p>
              </div>
            </div>
          </div>
          <div className={`about-image fade-in-right ${textVisible ? 'visible' : ''}`}>
            <div className="image-placeholder">
              <div className="profile-circle">
                <span>Your Photo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;