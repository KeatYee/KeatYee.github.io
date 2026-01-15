import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "Diacare",
      description: "A comprehensive healthcare web application designed for diabetes management. Features include patient monitoring, health tracking, medication reminders, and personalized health insights.",
      technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
      github: "https://github.com/KeatYee/diaCare",
      live: "#",
      poster: "/diaCarePoster.pdf",
      image: "/diaCare.png"
    },
    {
      title: "50Gram Wedding Platform",
      description: "Enhanced the existing wedding platform during my internship at Softwell Sdn Bhd. Implemented new features and improved user experience for couples planning their special day.",
      technologies: ["PHP", "Laravel", "JavaScript", "MySQL"],
      github: "#",
      live: "https://50gramwedding.com/app/",
      image: "/50Gram.png"
    },
    {
      title: "Scala Based FoodBank Management System",
      description: "A GUI-based food bank management program built with Scala. Features inventory tracking, donation management, and distribution scheduling to help food banks operate efficiently.",
      technologies: ["Scala", "JavaFX", "SQLite"],
      github: "https://github.com/sunwaydcis/final-project-KeatYee",
      live: "#",
      image: "foodBankSystem.png"
    },
    {
      title: "AWS Google Maps Extension",
      description: "A browser extension that integrates AWS services with Google Maps. Provides enhanced mapping capabilities, location-based data storage, and cloud-powered geospatial analysis.",
      technologies: ["JavaScript", "AWS", "Google Maps API", "Chrome Extension"],
      github: "https://github.com/KeatYee/fake-food-review-detector",
      live: "#",
      image: "project4"
    },
    {
      title: "Prismo - Online Tutoring Platform",
      description: "A comprehensive Figma prototype for an online tutoring platform. Designed with intuitive user flows, interactive learning features, and seamless communication between tutors and students.",
      technologies: ["Figma", "UI/UX Design", "Prototyping", "User Research"],
      github: "#",
      live: "#",
      image: "project5"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">
          Projects
        </h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
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
                  <a href={project.github} className="project-link">
                    <span>GitHub</span>
                  </a>
                  <a href={project.live} className="project-link">
                    <span>Live Demo</span>
                  </a>
                  {project.poster && (
                    <a href={project.poster} target="_blank" rel="noopener noreferrer" className="project-link">
                      <span>View Poster</span>
                    </a>
                  )}
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