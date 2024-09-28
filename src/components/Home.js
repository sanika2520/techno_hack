import React from 'react';
import '../styles/Additional.css';

const Home = () => {
  return (
    <div className="home">
      <header>
        <h2>Transform Your Daily Routine with PeakHabits</h2>
        {/* <p>Achieve your wellness goals by developing positive habits, tracking progress, and staying consistent.</p> */}
      </header>
      
      <section className="features">
        <h3>Key Features</h3>
        <ul>
          <li>
            <h3>Habit Tracking</h3>
            <p>Set daily or weekly goals for exercise, hydration, sleep, and more.</p>
          </li>
          <li>
            <h3>Reminders & Notifications</h3>
            <p>Stay on track with personalized reminders.</p>
          </li>
          <li>
            <h3>Progress Monitoring</h3>
            <p>View your habit streaks, completion rates, and overall progress over time.</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Home;

