import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes and Route instead of Switch
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes here */}
        <Route path="/" element={<LandingPage />} /> {/* Route for LandingPage */}
        <Route path="/login" element={<div><h2>Login or Signup Page</h2></div>} /> {/* Route for Login/Signup page */}
      </Routes>
    </Router>
  );
}

export default App;
