import React, { useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import './App.css'

function App() {
  const bgMusicRef = useRef(null);

  useEffect(() => {
    // Enable custom cursor
    document.body.classList.add('custom-cursor-active');
    
    // Initialize background music
    bgMusicRef.current = new Audio('/background-music.mp3');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.2;

    // Check if muted
    const isMuted = localStorage.getItem('soundMuted') === 'true';
    
    // Attempt to play background music (requires user interaction on most browsers)
    if (!isMuted) {
      const playMusic = () => {
        bgMusicRef.current.play().catch(err => {
          console.log('Background music autoplay prevented:', err);
          // Add one-time click listener to start music
          document.addEventListener('click', () => {
            if (bgMusicRef.current && !isMuted) {
              bgMusicRef.current.play().catch(err => console.log('Music play failed:', err));
            }
          }, { once: true });
        });
      };
      playMusic();
    }

    // Listen for mute state changes
    const handleMuteChange = () => {
      const isMuted = document.documentElement.getAttribute('data-muted') === 'true';
      if (bgMusicRef.current) {
        if (isMuted) {
          bgMusicRef.current.pause();
        } else {
          bgMusicRef.current.play().catch(err => console.log('Music play failed:', err));
        }
      }
    };

    // Create MutationObserver to watch for data-muted changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-muted') {
          handleMuteChange();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-muted']
    });
    
    return () => {
      document.body.classList.remove('custom-cursor-active');
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      observer.disconnect();
    };
  }, []);

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

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <CustomCursor />
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
