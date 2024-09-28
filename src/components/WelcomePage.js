import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/WelcomePage.css'; // Correctly import the CSS file

const WelcomePage = () => {
  return (
    <div className="welcome-section">   
      <h1>Welcome to Peak Habits!</h1>
      <p>Your journey towards a healthier lifestyle starts here.</p>

      <div className="features-container">
        <Link to="/setgoals" className="feature-button"> {/* Updated path */}
          <h2>Set a Goal</h2>
          <p>Define your fitness or lifestyle goals for better health.</p>
        </Link>
        <Link to="/track-goal" className="feature-button"> {/* Updated path */}
          <h2>Track a Goal</h2>
          <p>Monitor your progress and stay motivated.</p>
        </Link>
        <Link to="/view-progress" className="feature-button"> {/* Updated path */}
          <h2>View Progress</h2>
          <p>Visualize your progress and celebrate the milestones on your path to a healthier lifestyle.</p>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
