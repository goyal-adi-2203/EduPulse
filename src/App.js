import React from 'react';
import Login from './components/Login/Login';
import {Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
function App() {
  return (
    <Routes>
     
        <Route index element={<LandingPage />} /> 
        <Route path='/login' element={<Login />} />
        
      </Routes>
  );
}

export default App;