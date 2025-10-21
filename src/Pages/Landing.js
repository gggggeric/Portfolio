import React, { useState, useEffect } from 'react';
import './Landing.css';
import certIntroPrompt from '../assets/introductionToPromptEngineering.png';
import certRLanguage from '../assets/rLanguageWesternUniversity.png';
import profilePic from '../assets/geric.jpg';

import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

const PortfolioLanding = () => {
  const [currentCert, setCurrentCert] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const certifications = [
    {
      title: "Introduction to Prompt Engineering",
      issuer: "OpenLearning",
      date: "2025",
      image: certIntroPrompt
    },
    {
      title: "R Programming Language",
      issuer: "Western University",
      date: "2025",
      image: certRLanguage
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.75;
        if (isInView) {
          setIsVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextCert = () => setCurrentCert((prev) => (prev + 1) % certifications.length);
  const prevCert = () => setCurrentCert((prev) => (prev - 1 + certifications.length) % certifications.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCert((prev) => (prev + 1) % certifications.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [certifications.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (This is a demo)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="portfolio-wrapper">
      {/* Navigation */}
      <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="logo">Portfolio</a>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {['Home', 'About', 'Projects', 'Certifications', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <div className="float-blob blob-1"></div>
          <div className="float-blob blob-2"></div>
        </div>
        <div className="hero-content">
          <div className="hero-avatar">
            <div className="avatar-ring">
              <img src={profilePic} alt="Geric Morit" className="avatar-image" />
            </div>
          </div>
          <h1 className="hero-title">Geric Morit</h1>
          <h2 className="hero-subtitle">Aspiring Full Stack Developer</h2>
          <p className="hero-description">
            Crafting exceptional digital experiences with cutting-edge technologies and creative innovation
          </p>
          <a href="#projects" className="cta-button">View My Work</a>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-bar">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </section>

    {/* About Section */}
<section id="about" className={`about-section ${isVisible.about ? 'visible' : ''}`}>
  <div className="container">
    <h2 className="section-title">About Me</h2>
    <div className="about-grid">
      <div className="about-text">
        <p>
          I'm a passionate developer and a student from <strong>Technological University of the Philippines - Taguig</strong>, 
          with expertise in creating innovative web solutions. I thrive on transforming complex problems into elegant, user-friendly applications.
        </p>
        <p>
          My academic journey at TUP-Taguig has fueled my curiosity and commitment to continuous learning, 
          always staying ahead with the latest technologies and best practices in the ever-evolving tech landscape.
        </p>
      </div>
      <div className="skills-container">
        <h3>Technical Skills</h3>
        <div className="skills-grid">
          {['React', 'JavaScript', 'Node.js', 'CSS3', 'HTML5', 'MongoDB', 'TypeScript', 'C++', 'Git'].map((skill) => (
            <div key={skill} className="skill-badge">{skill}</div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Projects Section */}
      <section id="projects" className={`projects-section ${isVisible.projects ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {[
              { 
                title: "TUPT-Counseling Scheduler", 
                desc: "Appointment Based System", 
                techs: ["React", "Python-Flask", "MongoDB"], 
                image: project1 
              },
              { 
                title: "UBNHS School Website", 
                desc: "A Website for UBNHS", 
                techs: ["HTML", "CSS", "JavaScript"], 
                image: project2
              },
              { 
                title: "CryptoGuard", 
                desc: "A System for Encrypting and Decrypting Files", 
                techs: ["Python-Djambo", "React", "CSS"], 
                image: project3 
              }
            ].map((project, idx) => (
              <div key={idx} className="project-card">
                <div className="project-image" style={{ backgroundImage: `url(${project.image})` }}></div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-tags">
                  {project.techs.map(tech => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className={`certifications-section ${isVisible.certifications ? 'visible' : ''}`}>
        <div className="container">
          <div className="cert-header">
            <svg className="award-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            <h2 className="section-title white">Certifications</h2>
          </div>
          <p className="cert-subtitle">Validated expertise and continuous learning</p>
          
          <div className="flip-container">
            <div className={`flip-card ${currentCert === 1 ? 'flipped' : ''}`}>
              {/* Front - First Certification */}
              <div className="flip-card-front">
                <div className="cert-card-flip">
                  <img 
                    src={certifications[0].image} 
                    alt={certifications[0].title}
                    className="cert-image-flip"
                  />
                  <div className="cert-info-overlay">
                    <h3>{certifications[0].title}</h3>
                    <p className="cert-issuer">{certifications[0].issuer}</p>
                    <p className="cert-date">{certifications[0].date}</p>
                  </div>
                </div>
              </div>
              
              {/* Back - Second Certification */}
              <div className="flip-card-back">
                <div className="cert-card-flip">
                  <img 
                    src={certifications[1].image} 
                    alt={certifications[1].title}
                    className="cert-image-flip"
                  />
                  <div className="cert-info-overlay">
                    <h3>{certifications[1].title}</h3>
                    <p className="cert-issuer">{certifications[1].issuer}</p>
                    <p className="cert-date">{certifications[1].date}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="flip-btn prev" onClick={prevCert}>‹</button>
            <button className="flip-btn next" onClick={nextCert}>›</button>
            
            <div className="flip-indicators">
              {certifications.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${idx === currentCert ? 'active' : ''}`}
                  onClick={() => setCurrentCert(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`contact-section ${isVisible.contact ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Let's Connect</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <div className="icon-circle cyan">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="label">Email</p>
                  <p className="value">geric.morit3211@gmail.com</p>
                </div>
              </div>
              <div className="info-card">
                <div className="icon-circle green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <p className="label">Phone</p>
                  <p className="value">+63 (915) 751-3981</p>
                </div>
              </div>
              <div className="social-links">
                <button className="social-btn github" onClick={() => window.open('https://github.com/gggggeric', '_blank')}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
                <button className="social-btn linkedin" onClick={() => window.open('https://www.linkedin.com/in/geric-morit/', '_blank')}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button className="social-btn facebook" onClick={() => window.open('https://web.facebook.com/geric.morit.t/', '_blank')}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="contact-form">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              <button onClick={handleSubmit} className="submit-btn">Send Message</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Geric Morit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PortfolioLanding;