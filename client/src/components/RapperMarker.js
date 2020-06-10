import React from 'react';
import {Marker} from 'react-google-maps';
import {connect} from 'react-redux';
import {setActiveRapper} from '../store/rappers';

const RapperMarker = (props) => {
  const [lat, lng] = props.fields.location_coordinates;

  const activateThisRapper = () =>{
    props.setActiveRapper(props.recordid);

  }

  return (
    <>
      <Marker
        position={{ lat, lng }}
        onClick={activateThisRapper}
        icon={{
          url: "/img/map-icon.png",
          scaledSize: new window.google.maps.Size(40, 40),
        }}
        zIndex={12}
      >
      </Marker>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setActiveRapper: (recordid) => dispatch(setActiveRapper(recordid)),
    // noActiveRapper: ()=> dispatch(noActiveRapper())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RapperMarker);

