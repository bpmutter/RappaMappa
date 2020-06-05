import React from 'react';
import Navigation from './components/Navigation';
import Map from './components/Map';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Navigation />
      </Router>
      {/* <Map/> */}
    </React.StrictMode>
  );
}

export default App;
