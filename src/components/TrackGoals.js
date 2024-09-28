// import React, { useEffect, useState } from 'react';
// import { db } from '../config/firebaseConfig'; // Adjust this import as necessary
// import './TrackGoals.css'; // Import the CSS file

// const TrackGoals = () => {
//   const [goals, setGoals] = useState([]);
//   const [goalProgress, setGoalProgress] = useState({});

//   // Fetch goals from Firestore when the component mounts
//   useEffect(() => {
//     const fetchGoals = async () => {
//       const goalsSnapshot = await db.collection('goals').get();
//       const goalsData = goalsSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setGoals(goalsData);
//     };

//     fetchGoals();
//   }, []);

//   // Update the goal progress in Firestore
//   const updateGoalInFirestore = async (goalId, newProgress) => {
//     await db.collection('goals').doc(goalId).update({ progress: newProgress });
//   };

//   const handleProgressUpdate = async (goalId) => {
//     const newProgress = goalProgress[goalId] || goals.find(goal => goal.id === goalId).progress;
//     setGoals((prevGoals) =>
//       prevGoals.map((goal) =>
//         goal.id === goalId ? { ...goal, progress: newProgress } : goal
//       )
//     );
//     setGoalProgress((prev) => ({ ...prev, [goalId]: undefined })); // Clear input after update

//     // Update progress in Firestore
//     await updateGoalInFirestore(goalId, newProgress);
//   };

//   const handleChange = (goalId, value) => {
//     setGoalProgress((prev) => ({
//       ...prev,
//       [goalId]: value,
//     }));
//   };

//   return (
//     <div className="track-goals-container">
//       <h2>Your Goals</h2>

//       <ul className="goals-list">
//         {goals.map((goal) => (
//           <li key={goal.id} className="goal-item">
//             <h4 className="goal-title">{goal.habit}</h4>
//             <p className="goal-target">Target: {goal.target}</p>
//             <p className="goal-progress">Current Progress: {goal.progress} out of {goal.target}</p>
//             <progress className="progress-bar" value={goal.progress} max={goal.target}></progress>
//             <input
//               type="number"
//               min="0"
//               max={goal.target}
//               value={goalProgress[goal.id] || goal.progress}
//               onChange={(e) => handleChange(goal.id, e.target.value)}
//               placeholder="Enter new progress"
//               className="progress-input"
//             />
//             <button className="update-button" onClick={() => handleProgressUpdate(goal.id)}>
//               Update Progress
//             </button>
//             {goal.progress >= goal.target && <span className="completion-status">Completed!</span>}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TrackGoals;


// import React, { useEffect, useState } from 'react';
// import { db } from '../config/firebaseConfig'; // Adjust the import path as necessary
// import './TrackGoals.css'; // Import the CSS file

// const TrackGoals = () => {
//   const [goals, setGoals] = useState([]);
//   const [goalProgress, setGoalProgress] = useState({});

//   // Fetch goals from Firestore
//   useEffect(() => {
//     const fetchGoals = async () => {
//       try {
//         const goalsSnapshot = await db.collection('goals').get();
//         const goalsData = goalsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setGoals(goalsData);
//       } catch (error) {
//         console.error("Error fetching goals: ", error);
//       }
//     };

//     fetchGoals();
//   }, []);

//   // Update goal progress in Firestore
//   const handleProgressUpdate = async (goalId) => {
//     const newProgress = goalProgress[goalId] || goals.find(goal => goal.id === goalId).progress;

//     try {
//       await db.collection('goals').doc(goalId).update({ progress: newProgress });
//       setGoals((prevGoals) =>
//         prevGoals.map((goal) =>
//           goal.id === goalId ? { ...goal, progress: newProgress } : goal
//         )
//       );
//       setGoalProgress((prev) => ({ ...prev, [goalId]: undefined })); // Clear input after update
//     } catch (error) {
//       console.error("Error updating progress: ", error);
//     }
//   };

//   const handleChange = (goalId, value) => {
//     setGoalProgress((prev) => ({
//       ...prev,
//       [goalId]: value,
//     }));
//   };

//   return (
//     <div className="track-goals-container">
//       <h2>Your Goals</h2>
//       {goals.length === 0 ? (
//         <p>No goals found. Please add some goals.</p>
//       ) : (
//         <ul className="goals-list">
//           {goals.map((goal) => (
//             <li key={goal.id} className="goal-item">
//               <h4 className="goal-title">{goal.goal}</h4>
//               <p className="goal-frequency">Goal Frequency: {goal.goalFrequency}</p>
//               <p className="reminder-frequency">Reminder Frequency: {goal.reminderFrequency}</p>
//               <p className="goal-progress">Current Progress: {goal.progress} out of {goal.target}</p>
//               <progress className="progress-bar" value={goal.progress} max={goal.target}></progress>
//               <input
//                 type="number"
//                 min="0"
//                 max={goal.target}
//                 value={goalProgress[goal.id] || goal.progress}
//                 onChange={(e) => handleChange(goal.id, e.target.value)}
//                 placeholder="Enter new progress"
//                 className="progress-input"
//               />
//               <button className="update-button" onClick={() => handleProgressUpdate(goal.id)}>
//                 Update Progress
//               </button>
//               {goal.progress >= goal.target && <span className="completion-status">Completed!</span>}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TrackGoals;



import React, { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig'; // Adjust the path to your firebaseConfig
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'; // Import necessary Firestore functions
import './TrackGoals.css'; // Import the CSS file

const TrackGoals = () => {
  const [goals, setGoals] = useState([]);
  const [goalProgress, setGoalProgress] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsCollection = collection(db, 'goals'); // Reference to the 'goals' collection
        const goalsSnapshot = await getDocs(goalsCollection);
        const goalsList = goalsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Goals:", goalsList); // Debug: Check fetched goals
        setGoals(goalsList); // Set goals to state
      } catch (err) {
        console.error("Error fetching goals:", err); // Log any errors
        setError(err.message); // Set error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchGoals();
  }, []);

  const handleProgressUpdate = async (goalId) => {
    const newProgress = goalProgress[goalId] || goals.find(goal => goal.id === goalId).progress;

    // Update Firestore document
    const goalDoc = doc(db, 'goals', goalId); // Reference to the specific goal document
    await updateDoc(goalDoc, { progress: newProgress }); // Update the progress in Firestore

    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId ? { ...goal, progress: newProgress } : goal
      )
    );
    setGoalProgress((prev) => ({ ...prev, [goalId]: undefined })); // Clear input after update
  };

  const handleChange = (goalId, value) => {
    setGoalProgress((prev) => ({
      ...prev,
      [goalId]: value,
    }));
  };

  if (loading) return <p>Loading goals...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message

  return (
    <div className="track-goals-container">
      <h2>Your Goals</h2>

      <ul className="goals-list">
        {goals.map((goal) => (
          <li key={goal.id} className="goal-item">
            <h4 className="goal-title">{goal.goal}</h4>
            <p className="goal-target">Target: {goal.target}</p>
            <p className="goal-progress">Current Progress: {goal.progress || 0} out of {goal.target}</p>
            <progress className="progress-bar" value={goal.progress || 0} max={goal.target}></progress>
            <input
              type="number"
              min="0"
              max={goal.target}
              value={goalProgress[goal.id] || goal.progress || 0}
              onChange={(e) => handleChange(goal.id, e.target.value)}
              placeholder="Enter new progress"
              className="progress-input"
            />
            <button className="update-button" onClick={() => handleProgressUpdate(goal.id)}>
              Update Progress
            </button>
            {goal.progress >= goal.target && <span className="completion-status">Completed!</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackGoals;
