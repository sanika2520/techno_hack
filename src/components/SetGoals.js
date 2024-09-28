import React, { useState, useEffect } from 'react'; // Import useEffect for handling reminders
import { db } from '../config/firebase'; // Adjust the path based on the actual structure
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods
import '../styles/SetGoals.css'; // Import the CSS file

const SetGoal = () => {
  const [goal, setGoal] = useState('');
  const [goalFrequency, setGoalFrequency] = useState('1'); // Default to 1
  const [goalFrequencyUnit, setGoalFrequencyUnit] = useState('days'); // Default to days
  const [reminderFrequency, setReminderFrequency] = useState('1'); // Default to 1 hour
  const [reminderUnit, setReminderUnit] = useState('hours'); // Default to hours
  const [reminderMessage, setReminderMessage] = useState('');
  const [isReminderPopupVisible, setIsReminderPopupVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    try {
      // Add the goal data to Firestore
      await addDoc(collection(db, 'goals'), {
        goal,
        goalFrequency: `${goalFrequency} ${goalFrequencyUnit}`,
        reminderFrequency: `${reminderFrequency} ${reminderUnit}`,
        reminderMessage,
      });

      // Show the reminder popup
      setIsReminderPopupVisible(true);
      
      // Reset the form fields
      setGoal('');
      setGoalFrequency('1');
      setReminderFrequency('1');
      setReminderMessage('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const closePopup = () => {
    setIsReminderPopupVisible(false); // Close the reminder popup
  };

  // Effect to handle reminders
  useEffect(() => {
    const intervalDuration = reminderUnit === 'hours' 
      ? reminderFrequency * 3600000 // Convert hours to milliseconds
      : reminderFrequency * 86400000; // Convert days to milliseconds

    const reminderInterval = setInterval(() => {
      setIsReminderPopupVisible(true);
    }, intervalDuration);

    return () => clearInterval(reminderInterval); // Clear interval on unmount
  }, [reminderFrequency, reminderUnit]);

  return (
    <div className="set-goal-container">
      <img 
        src={"https://thumbs.dreamstime.com/b/cubes-dice-your-goals-health-care-fitness-training-nutrition-sleep-cubes-dice-your-goals-health-care-fitness-137104820.jpg"} 
        alt="Set Your Goals" 
        className="goal-image" 
      />
      <h1>Set Your Goals</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="goal">Goal Description:</label>
          <input 
            type="text" 
            id="goal" 
            value={goal} 
            onChange={(e) => setGoal(e.target.value)} 
            placeholder="E.g., Exercise, Drink 3 liters of water daily." 
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="goalFrequency">Goal Frequency:</label>
          <input 
            type="number" 
            id="goalFrequency" 
            value={goalFrequency} 
            onChange={(e) => setGoalFrequency(e.target.value)} 
            min="1" 
            placeholder="Number of times" 
          />
          <select 
            value={goalFrequencyUnit} 
            onChange={(e) => setGoalFrequencyUnit(e.target.value)}
          >
            <option value="days">Daily</option>
            <option value="weeks">Weekly</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="reminderFrequency">Reminder Frequency:</label>
          <input 
            type="number" 
            id="reminderFrequency" 
            value={reminderFrequency} 
            onChange={(e) => setReminderFrequency(e.target.value)} 
            min="1" 
            placeholder="Number of hours/days" 
          />
          <select 
            value={reminderUnit} 
            onChange={(e) => setReminderUnit(e.target.value)}
          >
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="reminderMessage">Set Reminder Message:</label>
          <input 
            type="text" 
            id="reminderMessage" 
            value={reminderMessage} 
            onChange={(e) => setReminderMessage(e.target.value)} 
            placeholder="E.g., 'Don't forget to drink water!'" 
          />
        </div>

        <button type="submit">Set Goal</button>
      </form>

      {/* Reminder Popup */}
      {isReminderPopupVisible && (
        <div className="popup-message">
          <h2>Reminder Set!</h2>
          <p>{reminderMessage}</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SetGoal;
