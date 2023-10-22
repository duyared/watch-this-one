import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Discover Your Next Favorite Movie or TV Show</h1>
        <h2 className="hero-subtitle">Get Inspired with WatchThisOne</h2>
        <p className="hero-description">Looking for recommendations on what to watch next? WatchThisOne is here to help! 
                Explore our handpicked selection of the best movies and TV shows across various genres. 
                From thrilling blockbusters to hidden gems, we've got you covered. 
                Let our suggestions inspire your next entertainment journey.</p>
        <Link to="/movie" className="get-started-button">Get Started</Link>
      </div>
    </div>
  );
};

export default HeroSection;