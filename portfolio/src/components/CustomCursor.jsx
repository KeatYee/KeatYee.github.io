import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOverBowl, setIsOverBowl] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Create particle effect
  const createParticle = (x, y) => {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    
    const size = Math.random() * 4 + 2;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    particle.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      --tx: ${offsetX}px;
      --ty: ${offsetY}px;
      animation: particleFloat 0.8s ease-out forwards;
    `;
    
    const particleContainer = document.querySelector('.cursor-particles');
    if (particleContainer) {
      particleContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  };

  useEffect(() => {
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'cursor-particles';
    document.body.appendChild(particleContainer);

    let lastParticleTime = 0;

    const updatePosition = (e) => {
      // Handle both mouse and touch events
      const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
      const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;

      if (clientX === undefined || clientY === undefined) return;

      setPosition({ x: clientX, y: clientY });

      // Create particle trail (throttled)
      const now = Date.now();
      if (now - lastParticleTime > 50) {
        createParticle(clientX, clientY);
        lastParticleTime = now;
      }

      // Check if hovering over the bowl
      const bowlElement = document.querySelector('.ramen-bowl');
      if (bowlElement) {
        const rect = bowlElement.getBoundingClientRect();
        const isInside = 
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;
        
        setIsOverBowl(isInside);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add touch event listeners for mobile
    document.addEventListener('touchmove', updatePosition, { passive: true });
    document.addEventListener('touchstart', (e) => {
      handleMouseDown();
      updatePosition(e);
    });
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', updatePosition);
      document.removeEventListener('touchstart', handleMouseDown);
      document.removeEventListener('touchend', handleMouseUp);
      if (particleContainer.parentNode) {
        particleContainer.remove();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isOverBowl ? 'spoon-cursor' : 'dot-cursor'} ${isClicking ? 'clicking' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {isOverBowl ? (
        <img src="/ladle.png" alt="spoon" className="spoon-icon" />
      ) : (
        <div className="cursor-dot"></div>
      )}
    </div>
  );
};

export default CustomCursor;
