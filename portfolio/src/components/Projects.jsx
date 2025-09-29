import React from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import './Projects.css';

const Projects = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [visibleProjects, setProjectRef] = useStaggeredAnimation(3, 200);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "#",
      live: "#",
      image: "project1"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "Firebase", "Material-UI", "WebSocket"],
      github: "#",
      live: "#",
      image: "project2"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application that displays current conditions and forecasts using external APIs with beautiful data visualizations.",
      technologies: ["JavaScript", "Chart.js", "REST API", "CSS3"],
      github: "#",
      live: "#",
      image: "project3"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 
          ref={titleRef}
          className={`section-title fade-in-up ${titleVisible ? 'visible' : ''}`}
        >
          Featured Projects
        </h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={index} 
              ref={setProjectRef(index)}
              className={`project-card stagger-item ${visibleProjects.has(index) ? 'visible' : ''}`}
            >
              <div className="project-image">
                <div className="project-placeholder">
                  <span>Project {index + 1}</span>
                </div>
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
                  <a href={project.github} className="project-link">
                    <span>GitHub</span>
                  </a>
                  <a href={project.live} className="project-link">
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;