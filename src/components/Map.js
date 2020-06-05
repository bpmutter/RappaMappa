import React, { useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import theme from '../assets/style/mapTheme';
import RapperMarker from './RapperMarker';
import rapperList from '../assets/data/rapperData.json';
import { connect } from "react-redux";
import  {getRappers} from '../store/rappers'
import RapperInfoBox from './RapperInfoBox';
const Map = withScriptjs(withGoogleMap((props) => {
    
    //get rappers on load
    useEffect(()=>{
        props.getRappers()
    }, []);
    if(props.activeRapper){
    console.log("lat:", props.activeRapper.fields.location_coordinates[0])
    console.log("lng:", props.activeRapper.fields.location_coordinates[1]);}
    return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 40.8448, lng: -73.8648 }}
        defaultOptions={{ styles: theme }}
      >
        {rapperList.map((rapper) => {
          return <RapperMarker {...rapper} key={rapper.recordid} />;
        })}
        {props.activeRapper && (
          //NOTE: Added hidden Marker with InfoBox to force it to occur in correct location dynamically
          // seems to be some problem with API, not allowing dynamic positioning of Infobox  
          //also had to add icon of no size Marker to force nothing to show up
          <Marker
            position={{
              lat: props.activeRapper.fields.location_coordinates[0],
              lng: props.activeRapper.fields.location_coordinates[1],
            }}
            icon={{
              url: "/img/map-icon.png",
              scaledSize: new window.google.maps.Size(0, 0),
            }}
          >
            <RapperInfoBox {...props.activeRapper} />
          </Marker>
        )}
      </GoogleMap>
    );
})
);

const mapStateToProps = (state) => {
  return {
    rappers: state.rappers.activeRapper,
    activeRapper: state.rappers.activeRapper,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRappers: () => dispatch(getRappers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
