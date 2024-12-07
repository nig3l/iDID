import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import NavbarLanding from '../Navbar/NavbarLanding';
import './About.css';

const About = () => {
  return (
    <div className="landing-container">
      <NavbarLanding />
      <main className="about-content">
        <section className="mission-section">
          <h1>Why iDID Exists</h1>
          <p className="mission-text">
            iDID was born from a simple yet powerful idea: focus on achievements, not obligations. 
            Instead of staring at an endless todo list that makes you feel overwhelmed, 
            we flip the script and celebrate what you've accomplished.
          </p>
          <p className="mission-text">
            By documenting your wins, you build momentum and confidence. 
            Each completed task becomes a victory worth celebrating, transforming 
            the way you view your productivity and personal growth.
          </p>
        </section>

        <section className="team-section">
          <h2>Meet the Creator</h2>
          <div className="team-member">
            <div className="member-image">
              <img src="https://api.dicebear.com/6.x/avataaars/svg?seed=nc" alt="Nigel Chimwene" />
            </div>
            <h3>Nigel Chimwene</h3>
            <p className="member-title">Indie Hacker & Creator</p>
            <p className="member-bio">
              Building tools that make people's lives better, one achievement at a time.
              iDID is crafted with love and attention to detail to help you recognize and 
              celebrate your daily wins.
            </p>
            <div className="social-links">
               <a href="https://github.com/nig3l" className="social-link">
                  <FaGithub />
                        GitHub
                </a>
               <a href="https://www.linkedin.com/in/nigel-chimwene-911535202/" className="social-link">
                 <FaLinkedin />
                        LinkedIn
                 </a>
             </div>
          </div>
          
        </section>
      </main>
    </div>
  );
};

export default About;

