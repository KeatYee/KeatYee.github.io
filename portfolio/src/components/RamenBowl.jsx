import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import './RamenBowl.css';

const RamenBowl = () => {
  const bowlRef = useRef(null);
  const engineRef = useRef(null);
  const bodiesMapRef = useRef(new Map());
  const [skillElements, setSkillElements] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const bubbleSoundRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const hasAutoStirredRef = useRef(false);
  const wrapperRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    bubbleSoundRef.current = new Audio('/bubble.wav');
    bubbleSoundRef.current.volume = 0.3;
  }, []);

  // Skill ingredient data
  const skillsData = [
    { name: 'React', type: 'cream' },
    { name: 'Laravel', type: 'pink' },
    { name: 'JavaScript', type: 'blue' },
    { name: 'TypeScript', type: 'green' },
    { name: 'CSS', type: 'cream' },
    { name: 'HTML', type: 'pink' },
    { name: 'MySQL', type: 'blue' },
    { name: 'Firebase', type: 'green' },
    { name: 'Git', type: 'cream' },
    { name: 'AWS Services', type: 'pink' },
    { name: 'PHP', type: 'blue' },
    { name: 'Vite', type: 'green' },
    { name: 'C++', type: 'cream' },
  ];

  // Ingredient colors (Pastel)
  const ingredientColors = {
    cream: { bg: '#FFF8E1', text: '#2C3E50' },
    pink: { bg: '#FFE8F0', text: '#2C3E50' },
    green: { bg: '#E8F5E9', text: '#2C3E50' },
    blue: { bg: '#E3F2FD', text: '#2C3E50' },
  };

  // Calculate pill width based on text length
  const getPillWidth = (text) => {
    const baseWidth = 140;
    const charWidth = 8;
    return Math.max(140, Math.min(180, baseWidth + text.length * charWidth));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-stir on scroll (IntersectionObserver)
  useEffect(() => {
    if (isMobile || !wrapperRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoStirredRef.current) {
            hasAutoStirredRef.current = true;
            // Trigger auto-stir after a short delay
            setTimeout(() => {
              autoStir(0.035); // Medium strength
            }, 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  // Auto-stir function (silent)
  const autoStir = (magnitude = 0.035) => {
    const { Body } = Matter;

    bodiesMapRef.current.forEach(({ body }) => {
      const angle = Math.random() * Math.PI * 2;
      Body.applyForce(body, body.position, {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
    });
  };

  useEffect(() => {
    if (isMobile || !bowlRef.current) return;

    const { Engine, World, Bodies, Body, Mouse, MouseConstraint } = Matter;

    const container = bowlRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    // Setup engine with low gravity (soup effect)
    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 0.3;
    engineRef.current = engine;

    // Create invisible walls for the bowl (bouncy!)
    const wallThickness = 40;
    const topWall = Bodies.rectangle(centerX, -wallThickness / 2, width * 2, wallThickness, {
      isStatic: true,
      restitution: 1, // Bouncy walls
    });
    const leftWall = Bodies.rectangle(-wallThickness / 2, centerY, wallThickness, height * 2, {
      isStatic: true,
      restitution: 1,
    });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, centerY, wallThickness, height * 2, {
      isStatic: true,
      restitution: 1,
    });
    const bottomWall = Bodies.rectangle(centerX, height + wallThickness / 2, width * 2, wallThickness, {
      isStatic: true,
      restitution: 1,
    });

    World.add(world, [topWall, leftWall, rightWall, bottomWall]);

    // Create skill bodies (rounded rectangles - pills)
    const skillBodies = skillsData.map((skill, index) => {
      const angle = (index / skillsData.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.25;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const pillWidth = getPillWidth(skill.name);

      const body = Bodies.rectangle(x, y, pillWidth, 60, {
        restitution: 0.7,
        friction: 0.4,
        frictionAir: 0.015,
        label: skill.name,
        chamfer: { radius: 30 },
      });

      body.skillName = skill.name;
      body.ingredientType = skill.type;
      body.pillWidth = pillWidth;

      World.add(world, body);
      bodiesMapRef.current.set(body.id, { body, skill: skill.name, type: skill.type, width: pillWidth });
      return body;
    });

    // Set initial skill elements
    setSkillElements(
      skillBodies.map((body) => ({
        id: body.id,
        skill: body.skillName,
        type: body.ingredientType,
        width: body.pillWidth,
      }))
    );

    // Mouse constraint for interaction
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);

    // Mouse stirring (invisible spoon)
    let lastSoundTime = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      mousePositionRef.current.prevX = mousePositionRef.current.x;
      mousePositionRef.current.prevY = mousePositionRef.current.y;
      mousePositionRef.current.x = currentX;
      mousePositionRef.current.y = currentY;

      // Calculate mouse velocity
      const deltaX = currentX - mousePositionRef.current.prevX;
      const deltaY = currentY - mousePositionRef.current.prevY;
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // If mouse is moving fast enough, apply forces to nearby bodies
      if (velocity > 5) {
        // Play sound (throttled to every 500ms) - check mute state
        const isMuted = document.documentElement.getAttribute('data-muted') === 'true';
        const now = Date.now();
        if (now - lastSoundTime > 500 && bubbleSoundRef.current && !isMuted) {
          bubbleSoundRef.current.currentTime = 0;
          bubbleSoundRef.current.play().catch(err => console.log('Audio play failed:', err));
          lastSoundTime = now;
        }

        bodiesMapRef.current.forEach(({ body }) => {
          const dx = body.position.x - currentX;
          const dy = body.position.y - currentY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Apply force to bodies within 150px radius
          if (distance < 150) {
            const forceMagnitude = (1 - distance / 150) * 0.002 * velocity;
            const angle = Math.atan2(dy, dx);
            
            Body.applyForce(body, body.position, {
              x: Math.cos(angle) * forceMagnitude,
              y: Math.sin(angle) * forceMagnitude,
            });
          }
        });
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop with DOM sync and rotation constraint
    const maxRotation = (20 * Math.PI) / 180; // 20 degrees in radians
    const handleFrame = () => {
      Engine.update(engine);

      // Update DOM elements position and constrain rotation
      bodiesMapRef.current.forEach(({ body, skill }) => {
        // Constrain rotation to prevent upside-down text
        if (Math.abs(body.angle) > maxRotation) {
          const constrainedAngle = Math.max(-maxRotation, Math.min(maxRotation, body.angle));
          Body.setAngle(body, constrainedAngle);
        }

        const element = document.querySelector(`[data-skill-id="${body.id}"]`);
        if (element && body) {
          const x = body.position.x;
          const y = body.position.y;
          const angle = body.angle;

          element.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle}rad)`;
        }
      });

      requestAnimationFrame(handleFrame);
    };

    const frameId = requestAnimationFrame(handleFrame);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousemove', handleMouseMove);
      World.clear(world);
      Engine.clear(engine);
      bodiesMapRef.current.clear();
    };
  }, [isMobile]);

  if (isMobile) {
    // Mobile fallback - pill grid
    return (
      <div className="ramen-bowl-mobile">
        {skillsData.map((skill) => {
          const colors = ingredientColors[skill.type];
          const pillWidth = getPillWidth(skill.name);
          return (
            <div
              key={skill.name}
              className="ingredient-mobile"
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                width: `${Math.min(pillWidth, 140)}px`,
              }}
            >
              {skill.name}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="ramen-bowl-wrapper" ref={wrapperRef}>
      <div className="ramen-bowl" ref={bowlRef}>
        <div className="bowl-ingredients">
          {skillElements.map(({ id, skill, type, width }) => {
            const colors = ingredientColors[type];
            return (
              <div
                key={id}
                data-skill-id={id}
                className="ingredient"
                style={{
                  width: `${width}px`,
                  backgroundColor: colors.bg,
                  color: colors.text,
                }}
              >
                {skill}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RamenBowl;
