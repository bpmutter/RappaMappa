/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {connect} from 'react-redux';
import SearchIcon from "@material-ui/icons/Search";
function ComboBox(props) {
    console.log("RAPPERS",props.rappers);

    let rapperNames = [];
    if( props.rappers && props.rappers.length){
        rapperNames = props.rappers.map(rapper=> rapper.fields.name)
    }
    // .map( rapper => rapper.fields.name);

  return (
    <>
      {props.rappers && props.rappers.length ? (
        <Autocomplete
          id="combo-box"
          options={rapperNames}
          style={{ width: 300 }}
          autoComplete
          renderInput={(params) => (
            <TextField
              {...params}
              label={<SearchIcon/>}
              variant="outlined"
              style={{ color: "white" }}
            />
          )}
        />
      ) : null}{" "}
    </>
  );
}


const mapStateToProps = (state) => {
    console.log(state.rappers.rappers)
  return {
    rappers: state.rappers.rappers,
  };
};

export default connect(mapStateToProps)(ComboBox);