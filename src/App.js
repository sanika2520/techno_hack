// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './components/LandingPage';
// import LoginPage from './components/LoginPage' ;// Your existing landing page component


// const App = () => {
//   return (
//     <Router>
//       <div>
//         {/* The Navbar and Slider will remain the same */}
//         <LandingPage />

//         {/* Define the routes for different sections */}
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correctly using Routes and Route
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage'; // Assuming you have a LoginPage component

function App() {
  return (
    <Router>
      <Routes> {/* Correctly using Routes */}
        <Route path="/" element={<LandingPage />} /> {/* Route for LandingPage */}
        <Route path="/login" element={<LoginPage />} /> {/* Route for Login/Signup page */}
      </Routes>
    </Router>
  );
}

export default App;
