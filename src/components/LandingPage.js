
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import '../styles/LandingPage.css'; 

// Importing images for healthy habits
import joggingImage from '../assets/jogging.webp';
import drinkingWaterImage from '../assets/drinking_water.webp';
import cyclingImage from '../assets/cycling.jpg';
import fitnessImage from '../assets/Fitness.jpg';
import balancedMealImage from '../assets/balanced meal.jpg';

const LandingPage = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of images to show at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Time between slides (in milliseconds)
  };

  return (
    <div className="landing-container">
      <header className="navbar">
        <h1>Peak Habits</h1>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/login" className="nav-link">Login/Signup</Link>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="motivation">Build Healthy Habits for a Better You!</h1>
        <div className="get-set-grow">Get, Set, Grow !!!</div>
      </main>

      {/* Healthy Habits Slider Section */}
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

    </div>
  );
};

export default LandingPage;
