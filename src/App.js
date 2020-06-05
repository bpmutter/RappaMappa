import React from 'react';
import Navigation from './components/Navigation';
import Map from './components/Map';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import {googleMapsAPIKey} from './config';


function App() {
  return (
    <React.StrictMode>
      <Router>
        <Navigation />
        <Map
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `90.5%`, width:'100%', position:'absolute' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Router>
    </React.StrictMode>
  );
}

export default App;
