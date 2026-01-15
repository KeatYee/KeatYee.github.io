import React, { useMemo } from 'react';
import './FloatingParticles.css';

const Fireflies = () => {
  const fireflies = useMemo(() => {
    const count = 25; // More particles, but smaller
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: 10 + Math.random() * 10, // Slow movement
      delay: Math.random() * 5,
      scale: 0.5 + Math.random() * 0.5, // Varying sizes
    }));
  }, []);

  return (
    <div className="fireflies-container">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="firefly"
          style={{
            left: `${firefly.left}%`,
            top: `${firefly.top}%`,
            animationDuration: `${firefly.animationDuration}s`,
            animationDelay: `${firefly.delay}s`,
            transform: `scale(${firefly.scale})`,
          }}
        />
      ))}
    </div>
  );
};

export default Fireflies;