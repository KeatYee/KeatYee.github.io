import React, { useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
      '.education-card, .timeline-item, .project-card, .contact-card, ' +
      '.subsection-title, .contact-subtitle, .highlight-badge, ' +
      '.timeline-skills span, .tech-tag'
    );

    animatableElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });

    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    const handleMouseEnter = (e) => {
      // Check if hovering over interactive elements
      const clickableSelectors = [
        'a', 'button', '.btn', '.project-card', '.skill-item', 
        'input', 'textarea', 'select', '.nav a', '.theme-toggle',
        '.timeline-item', '.education-card', '.scroll-down',
        '[role="button"]', '[onclick]', '.hero-name', '.highlight',
        '.tech-tag', '.timeline-skills span', '.highlight-badge'
      ].join(', ');
      
      if (e.target.matches(clickableSelectors) || e.target.closest(clickableSelectors)) {
        cursorRef.current?.classList.add('hover');
      }
    };

    const handleMouseLeave = (e) => {
      const clickableSelectors = [
        'a', 'button', '.btn', '.project-card', '.skill-item', 
        'input', 'textarea', 'select', '.nav a', '.theme-toggle',
        '.timeline-item', '.education-card', '.scroll-down',
        '[role="button"]', '[onclick]', '.hero-name', '.highlight',
        '.tech-tag', '.timeline-skills span', '.highlight-badge'
      ].join(', ');
      
      if (e.target.matches(clickableSelectors) || e.target.closest(clickableSelectors)) {
        cursorRef.current?.classList.remove('hover');
      }
    };

    const handleMouseDown = () => {
      cursorRef.current?.classList.add('click');
    };

    const handleMouseUp = () => {
      cursorRef.current?.classList.remove('click');
      setTimeout(() => {
        cursorRef.current?.classList.remove('hover');
      }, 100);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (cursorRef.current && document.body.contains(cursorRef.current)) {
        document.body.removeChild(cursorRef.current);
      }
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
