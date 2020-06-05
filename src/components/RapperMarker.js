import React, {useState} from 'react';
import {Marker} from 'react-google-maps';
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import RapperInfoBox from './RapperInfoBox'

const RapperMarker = (props) => {
  const [lat, lng] = props.fields.location_coordinates;
  const [showInfoBox, setShowInfoBox] = useState(false);
  const toggleInfoBox = () =>{
    setShowInfoBox(!showInfoBox);
  }
  debugger;
  return (
    <Marker 
      position={{ lat, lng }} 
      onClick={toggleInfoBox}
      icon={{
        url:"/img/map-icon.png",
        scaledSize: new window.google.maps.Size(40,40)
      }}
      zIndex={12}
    >
      {showInfoBox && <RapperInfoBox {...props} toggleInfoBox={toggleInfoBox}/>}      
    </Marker>
  );
}

export default RapperMarker

