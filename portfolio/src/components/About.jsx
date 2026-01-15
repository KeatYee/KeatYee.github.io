import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about section-fade-in">
      <div className="container">
        <h2 className="section-title">
          My Story
        </h2>
        
        {/* My Background Section */}
        <div className="about-subsection">
          <h3 className="subsection-title">🍜 My Journey</h3>
          <div className="background-content">
            <p>
              I'm a passionate Computer Science student at Sunway University with a strong interest in 
              full-stack development and creating innovative digital solutions. My journey in technology 
              started with curiosity and has evolved into a dedicated pursuit of building impactful applications.
            </p>
            <p>
              When I'm not coding: You can find me crocheting intricate patterns, drawing digital art, 
              or trying to perfect my cooking recipe. I believe that staying creative offline makes me a 
              better logic-solver online ฅ●ω●ฅ
            </p>
            <a href="/resume.pdf" download="KeatYee_Resume.pdf" className="resume-download-btn" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        {/* Education Card Section */}
        <div className="about-subsection">
          <h3 className="subsection-title">🎓 Education</h3>
          
          {/* Bachelor's Degree */}
          <div className="education-card">
            <div className="education-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="education-details">
              <h4>Bachelor of Computer Science (Hons)</h4>
              <p className="institution">
                <a href="https://sunwayuniversity.edu.my/school-of-computing-and-artificial-intelligence/courses/bachelor-of-science-honours-computer" target="_blank" rel="noopener noreferrer">
                  Sunway University
                </a>
              </p>
              <p className="duration">2024 - 2026</p>
              <p className="description">
                Specializing in Software Engineering, Data Structures, and Web Development. 
                Actively participating in coding competitions and contributing to open-source projects.
              </p>
              <div className="education-highlights">
                <span className="highlight-badge">GPA: 3.8/4.0</span>
                <span className="highlight-badge">Dean's List</span>
                <span className="highlight-badge">Jeffrey Cheah Ace Scholarship Holder</span>
              </div>
            </div>
          </div>

          {/* Diploma */}
          <div className="education-card">
            <div className="education-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                <circle cx="12" cy="14" r="2"/>
              </svg>
            </div>
            <div className="education-details">
              <h4>Diploma in Information Technology</h4>
              <p className="institution">
                <a href="https://sunway.edu.my/velocity/programme/diploma-in-information-technology" target="_blank" rel="noopener noreferrer">
                  Sunway College @ Velocity
                </a>
              </p>
              <p className="duration">2022 - 2024</p>
              <p className="description">
                Foundation in programming, database management, and network fundamentals. 
                Developed strong problem-solving skills and technical foundations in IT.
              </p>
              <div className="education-highlights">
                <span className="highlight-badge">GPA: 3.81/4.0</span>
                <span className="highlight-badge">Best FYP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Working Experience Timeline */}
        <div className="about-subsection">
          <h3 className="subsection-title">🧵 Work Experience</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">Jun 2024 - Aug 2024</div>
                <h4>Web Developer Intern</h4>
                <p className="company">
                  <a href="https://softwell.asia/" target="_blank" rel="noopener noreferrer">
                    Softwell Sdn Bhd
                  </a>
                </p>
                <p className="role-description">
                  Contributed to the enhancement of the existing 50Gram Wedding Platform
                   by implementing new features and improving user experience.
                </p>
                <div className="timeline-skills">
                  <span>Laravel</span>
                  <span>Javascript</span>
                  <span>PHP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;