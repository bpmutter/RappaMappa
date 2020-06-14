import React, {useState, useEffect} from 'react';
import Navigation from './components/Navigation';
import Map from './components/Map';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import AboutPage from './components/AboutPage';
import NoMatch from './components/NoMatch';
import ErrorHandler from "./components/ErrorHandler";
import {connect} from 'react-redux';
import { getRappers } from "./store/rappers";
import LoadingSpinner from './components/LoadingSpinner';
const googleMapsAPIKey = 'AIzaSyBNf4_S9tTiAgNXwUEDLgmSo6nbJ06NG7A';

function App(props) {
  
  useEffect(() => {
    (async () => {
      await props.getRappers();
      console.log(props.rappers);
    })();
  }, []);

  return (
    <React.StrictMode>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            {!props.rappersLoaded ? (
              <LoadingSpinner  />
            ) : (
              <Map
                isMarkerShown
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div
                    style={{
                      bottom: 0,
                      left: 0,
                      top: 60,
                      width: "100%",
                      position: "absolute",
                    }}
                  />
                }
                mapElement={<div style={{ height: `100%` }} />}
                rappers={props.rappers}
              />
            )}
          </Route>
          <Route path="/about">
            <AboutPage />
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

const mapStateToProps = state =>{
  return {
    rappers: state.rappers.rappers,
    rappersLoaded: state.rappers.rappers ? !!state.rappers.rappers.length : false
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRappers: () => dispatch(getRappers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
