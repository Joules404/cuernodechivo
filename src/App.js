import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Body from './home';
import Navbar from './navbar';
import Versus from './versus';
import VersusLink from './versusLink'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
          <Routes>
            <Route path="/" element={<Body/>} />
            <Route path="/versus" element={<Versus/>} />
            <Route path="/versus/:testId" element={<VersusLink/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
