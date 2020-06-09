/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {connect} from 'react-redux';
import SearchIcon from "@material-ui/icons/Search";
import { setSearchActive } from '../store/rappers';
import { invalidSearch } from '../store/errorHandler';

function ComboBox(props) {
    let rapperNames = [];
    if( props.rappers && props.rappers.length){
        rapperNames = props.rappers.map(rapper=> rapper.fields.name)
    }

    const handleSearch = e => {
        e.preventDefault();
        const query = document.getElementsByName("search-query")[0].value;
        if(rapperNames.includes(query)){
            props.search(query);
        } 
        else{
            console.log("do error handling stuff...");
            props.invalidSearch();
        }
    }
    return (
      <>
        {props.rappers && props.rappers.length ? (
          <form onSubmit={handleSearch}>
            <Autocomplete
              id="combo-box"
              options={rapperNames}
              style={{ width: 300 }}
              autoComplete
              noOptionsText={"Please select one of the listed artists"}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={<SearchIcon />}
                  variant="outlined"
                  name="search-query"
                  style={{ color: "white" }}
                />
              )}
            />
          </form>
        ) : null}{" "}
      </>
    );
}


const mapStateToProps = (state) => {
  return {
    rappers: state.rappers.rappers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => dispatch(setSearchActive(query)),
    invalidSearch: () => dispatch(invalidSearch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboBox);