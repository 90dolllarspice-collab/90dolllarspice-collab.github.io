
import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="whr-hero" aria-label="Hero">
      <img 
        src="https://90dolllarspice-collab.github.io/head.png" 
        alt="Wiring harness Restoration" 
      />
      <div className="whr-hero-overlay"></div>
    </section>
  );
};

export default Hero;
