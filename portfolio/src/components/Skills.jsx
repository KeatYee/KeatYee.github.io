import React, { useEffect, useRef } from 'react';
import './Skills.css';
import RamenBowl from './RamenBowl';

const Skills = () => {
  const chefNoteRef = useRef(null);
  const paperSoundRef = useRef(null);

  useEffect(() => {
    // Initialize paper slide sound
    paperSoundRef.current = new Audio('/paper-slide.wav');
    paperSoundRef.current.volume = 0.9;

    const handleMouseEnter = () => {
      // Check if muted
      const isMuted = document.documentElement.getAttribute('data-muted') === 'true';
      
      if (!isMuted && paperSoundRef.current) {
        paperSoundRef.current.currentTime = 0;
        paperSoundRef.current.play().catch(err => console.log('Paper sound play failed:', err));
      }
    };

    if (chefNoteRef.current) {
      chefNoteRef.current.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      if (chefNoteRef.current) {
        chefNoteRef.current.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  return (
    <section id="skills" className="skills section-fade-in">
      <div className="container">
        <h2 className="section-title">Skills & Tools</h2>
        
        <div className="chef-note" ref={chefNoteRef}>
          <span className="chef-icon">👩‍🍳</span>
          <p className="chef-text">
            Coding is just like cooking ramen. You need a rich, robust backend (the broth) 
            to support a beautiful, interactive frontend (the toppings). Here are the fresh 
            ingredients I use to craft my applications.
          </p>
        </div>

        <RamenBowl />
      </div>
    </section>
  );
};

export default Skills;