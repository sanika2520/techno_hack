
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import AboutUs from './AboutUs';
import WhyUs from './WhyUs'; 
// Import WhyUs component
import '../styles/LandingPage.css'; 

// Importing images for healthy habits
import joggingImage from '../assets/jogging.webp';
import drinkingWaterImage from '../assets/drinking_water.webp';
import cyclingImage from '../assets/cycling.jpg';
import fitnessImage from '../assets/Fitness.jpg';
import balancedMealImage from '../assets/balanced meal.jpg';

const LandingPage = () => {
  // State to manage visibility of About Us and Why Us content
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showWhyUs, setShowWhyUs] = useState(false);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // Toggle About Us content
  const handleAboutUsClick = () => {
    setShowAboutUs(!showAboutUs);
    setShowWhyUs(false);
  };

  // Toggle Why Us content
  const handleWhyUsClick = () => {
    setShowWhyUs(!showWhyUs);
    setShowAboutUs(false);
  };

  return (
    <div className="landing-container">
      <header className="navbar">
        <h1>Peak Habits</h1>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="#" onClick={handleAboutUsClick} className="nav-link">About Us</Link>
          <Link to="#" onClick={handleWhyUsClick} className="nav-link">Why Us</Link>
          <Link to="/login" className="nav-link">Login/Signup</Link> 
        </nav>
      </header>

      <main className="main-content">
        <h1 className="motivation">Stay Consistent, Stay Healthy!!</h1>
        <div className="get-set-grow">Get, Set, Grow !!!</div>
      </main>

      <section className="habit-slider">
        <Slider {...settings}>
          <div className="habit-slide">
            <img src={joggingImage} alt="Jogging" className="habit-image" />
            <h4>Jogging</h4>
          </div>
          <div className="habit-slide">
            <img src={drinkingWaterImage} alt="Drinking Water" className="habit-image" />
            <h4>Hydration</h4>
          </div>
          <div className="habit-slide">
            <img src={cyclingImage} alt="Cycling" className="habit-image" />
            <h4>Cycling</h4>
          </div>
          <div className="habit-slide">
            <img src={fitnessImage} alt="Fitness" className="habit-image" />
            <h4>Fitness</h4>
          </div>
          <div className="habit-slide">
            <img src={balancedMealImage} alt="Balanced Diet" className="habit-image" />
            <h4>Balanced Diet</h4>
          </div>
        </Slider>
      </section>

      {/* Conditional Rendering of About Us and Why Us */}
      {showAboutUs && <AboutUs />}
      {showWhyUs && <WhyUs />} {/* Render Why Us content */}

      <footer className='footer-bottom'>
      <p>Made by <strong>Techno Hack</strong> with <span className="love-symbol">❤</span></p>
        <p>Powered by <strong>React</strong></p>
        <div className="footer-links">
          <a href="https://github.com/sanika2520/techno_hack" target="_blank">GitHub</a> <strong> | </strong>
          <a href="mailto:sherlyshindal@gmail.com">Contact Us</a>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Techno Hack. All rights reserved.</p>
        </div>
      </footer>


    </div>
  );
};

export default LandingPage;
