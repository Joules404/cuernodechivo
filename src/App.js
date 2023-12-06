import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Body from './home';
import Navbar from './navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
          <Routes>
            <Route path="/" element={<Body/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
