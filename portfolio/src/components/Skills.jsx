import React, { useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
  const skillItemsRef = useRef([]);

  const skills = [
    { name: "HTML" },
    { name: "CSS" },
    { name: "PHP" },
    { name: "Javascript" },
    { name: "Bootstrap" },
    { name: "Laravel" },
    { name: "Codeigniter" },
    { name: "React" },
    { name: "Git" },
    { name: "AWS" },
    { name: "Python" },
    { name: "Java" },
    { name: "Figma" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const windowCenter = windowHeight / 2;

      skillItemsRef.current.forEach((item) => {
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        
        // Calculate distance from center of viewport
        const distanceFromCenter = Math.abs(windowCenter - itemCenter);
        const maxDistance = windowHeight / 2;
        
        // Normalize distance (0 = at center, 1 = at edge)
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        
        // Use quadratic easing for more dramatic effect
        const easeOut = 1 - Math.pow(normalizedDistance, 1.5);
        
        // Calculate scale and opacity based on distance
        // At center: scale 1.5, opacity 1
        // At edges: scale 0.6, opacity 0.3
        const scale = 0.6 + (easeOut * 0.9);
        const opacity = 0.3 + (easeOut * 0.7);
        
        // Apply transformations
        item.style.transform = `scale(${scale})`;
        item.style.opacity = opacity;
      });
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="skills" className="skills section-fade-in">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-column">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-item"
              ref={(el) => (skillItemsRef.current[index] = el)}
            >
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;