import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Projects.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const projects = [
    {
      title: "HobbyQuest - Degree FYP",
      description: "A Gamified Mobile Application for Personalized Hobby Learning with AI Assistance.",
      backgroundStory: "I created HobbyQuest because I noticed many people struggle to find and commit to new hobbies. By combining gamification with AI-powered recommendations, I wanted to make hobby discovery engaging and personalized. The app uses Gemini API to understand user interests and suggests activities through interactive quests with stunning Rive animations.",
      technologies: ["Flutter", "Dart", "Firebase", "Rive", "GeminiAI API"],
      github: "https://github.com/KeatYee/hobbyquest",
      demo: null,
      image: null
    },
    {
      title: "50Gram Wedding Platform",
      description: "Enhanced an existing wedding platform with new features and improved UX during internship.",
      backgroundStory: "During my internship at Softwell Sdn Bhd, I worked on enhancing the 50Gram wedding platform to help couples better plan their special day. I implemented new manage guestlist and checklist features and optimized the user experience while maintaining compatibility with the existing codebase, learning valuable lessons about working with legacy systems.",
      technologies: ["PHP", "Laravel", "JavaScript", "MySQL"],
      github: null,
      demo: "https://50gramwedding.com/app/",
      image: "/50Gram.png"
    },
    {
      title: "Diacare - Diploma FYP",
      description: "A comprehensive healthcare web application designed for diabetes management.",
      backgroundStory: "Diacare was born from my desire to help diabetes patients manage their health more effectively. I inspired by my little cousin and relatives living with diabetes, I designed this platform to solve the real-world friction they face in health monitoring. This project taught me how to build secure, user-centric healthcare systems that combine patient monitoring, medication tracking, and personalized insights—all while prioritizing data security and user privacy.",
      technologies: ["PHP", "JavaScript", "MySQL"],
      github: "https://github.com/KeatYee/diaCare",
      demo: null,
      poster: "/diaCarePoster.pdf",
      image: "/diaCare.png"
    },
    {
      title: "AWS Google Maps Extension",
      description: "A browser extension that integrates AWS services with Google Maps.",
      backgroundStory: "This project was a 48-hour sprint built with my team. We aimed to explore cloud-enhanced mapping, pushing ourselves to integrate AWS backend capabilities with Google Maps in a strictly limited timeframe. By integrating AWS backend capabilities with Google Maps, I discovered how to create powerful geospatial tools that leverage cloud infrastructure for real-time data processing and storage.",
      technologies: ["Python", 
        "JavaScript", 
        "Amazon Bedrock", 
        "AWS Lambda", 
        "API Gateway", 
        "Amazon S3",
        "SageMaker"],
      github: "https://github.com/KeatYee/fake-food-review-detector",
      demo: null,
      image: "/project4.png"
    },
    {
      title: "Prismo - Online Tutoring Platform",
      description: "A comprehensive Figma prototype for an online tutoring platform.",
      backgroundStory: "Prismo was developed during the Codenection Hackathon 2025 as a design thinking exercise. I created a detailed prototype exploring how thoughtful UX design could bridge the gap between tutors and students, focusing on seamless interactions, clear learning paths, and meaningful connections in a virtual learning environment.",
      technologies: ["Figma", "UI/UX Design", "Prototyping"],
      github: "https://github.com/KeatYee/prismo-tutoring-app",
      demo: null,
      figma: "https://www.figma.com/design/QfwjZVF7xBcCVsWlv1tS1O/CodeNection2025?node-id=0-1&t=Cp58iSTEEgDHYeop-1",
      image: "/project5.png"
    }
  ];

  const playSound = () => {
    const audio = new Audio('/paper-slide.wav');
    audio.volume = 0.5;
    console.log('Playing sound:', audio.src);
    audio.play().catch((error) => {
      console.error('Audio play error:', error);
    });
  };

  const openModal = (project) => {
    playSound();
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="projects section-fade-in">
      <div className="container">
        <h2 className="section-title">
          Projects
        </h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card"
              onClick={() => openModal(project)}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="project-placeholder">
                    <span>Project {index + 1}</span>
                  </div>
                )}
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      className="project-link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      className="project-link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Live Demo</span>
                    </a>
                  )}
                   {project.figma && (
                    <a 
                      href={project.figma} 
                      className="project-link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Figma</span>
                    </a>
                  )}
                  {project.poster && (
                    <a 
                      href={project.poster} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>View Poster</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Ticket Modal - Rendered via Portal */}
      {selectedProject && createPortal(
        <div className="modal-overlay" onClick={closeModal}>
          <div className="order-ticket" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            {/* Header */}
            <div className="ticket-header">
              <div className="order-number">ORDER #{Math.floor(Math.random() * 9000) + 1000}</div>
              <div className="order-date">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>

            {/* Body */}
            <div className="ticket-body">
              <h2 className="project-title">{selectedProject.title.toUpperCase()}</h2>

              {/* Background Story */}
              <div className="ticket-section">
                <div className="section-label">BACKGROUND STORY</div>
                <p className="background-story">{selectedProject.backgroundStory}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="ticket-footer">
              <div className="signature">Served with ❤️ by Keat Yee</div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Projects;