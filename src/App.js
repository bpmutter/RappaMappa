import React from 'react';
import Navigation from './components/Navigation';
import Map from './components/Map';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import keys from './config';
import RapperPage from './components/RapperPage';
import AboutPage from './components/AboutPage';
import NoMatch from './components/NoMatch';
import ErrorHandler from "./components/ErrorHandler";

const {googleMapsAPIKey} = keys;

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <Map
              isMarkerShown
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div
                  style={{
                    height: `90.5%`,
                    width: "100%",
                    position: "absolute",
                  }}
                />
              }
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/rappers/:id">
            <RapperPage />
          </Route>
          {/* 404 PAGE */}
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
        <ErrorHandler />
      </Router>
    </React.StrictMode>
  );
}

export default App;
