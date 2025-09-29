import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
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
              <div className="stat">
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>10+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>5+</h3>
                <p>Technologies Mastered</p>
              </div>
            </div>
          </div>
          <div className="about-image">
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