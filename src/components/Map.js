import React, { useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import theme from '../assets/style/mapTheme';
import RapperMarker from './RapperMarker';
import rapperList from '../assets/data/rapperData.json';
import { connect } from "react-redux";
import  {getRappers} from '../store/rappers'

const Map = withScriptjs(withGoogleMap((props) => {
    
    //get rappers on load
    useEffect(()=>{
        props.getRappers()
    }, []);

    return (
        <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 40.8448, lng: -73.8648 }}
        defaultOptions={{ styles: theme }}
        >
            {rapperList.map(rapper => {
                return <RapperMarker {...rapper} key={rapper.recordid}/>
            })}
        </GoogleMap>
    )
})
);

const mapStateToProps = (state) => {
  return {
    rappers: state.rappers.rappers,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRappers: () => dispatch(getRappers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
