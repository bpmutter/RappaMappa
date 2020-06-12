/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {connect} from 'react-redux';
import SearchIcon from "@material-ui/icons/Search";
import { setSearchActive } from '../store/rappers';
import { invalidSearch } from '../store/errorHandler';



function SearchBox(props) {
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
            props.invalidSearch();
        }
    }
    return (
      <>
        {props.rappers && props.rappers.length ? (
          <form onSubmit={handleSearch} style={{width: '100%'}}>
            <Autocomplete
              id="combo-box"
              options={rapperNames}
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
        ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);