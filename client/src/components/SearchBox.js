/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {connect} from 'react-redux';
import SearchIcon from "@material-ui/icons/Search";
import { setSearchActive } from '../store/rappers';
import { invalidSearch, clearErrorMessages } from '../store/errorHandler';
import { makeStyles, fade } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Redirect, useLocation } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: "7px 0",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: 300,
    },
  },
  // searchInput: {
  //   paddingLeft: 5,
  // },
  searchIconButton: {
    display: "inline-block",
    width: 50,
    color: "white",
    padding: "0 5px",
    margin: 0,
  },
}));
function SearchBox(props) {
    const classes = useStyles();
    const location = useLocation(); //gets browser location to only render search box on map
    let rapperNames = [];
    if( props.rappers && props.rappers.length){
        rapperNames = props.rappers.map(rapper=> rapper.fields.name);
    }
    const handleSearch = async e => {
        e.preventDefault();
        const query = document.getElementsByName("search-query")[0].value;
        const isValidSearch = await props.search(query);
        if(!isValidSearch) props.invalidSearch();
    }
    
    return (
      <>
        {props.rappers && props.rappers.length  && location.pathname === "/" ? (
          <>
            <div className={classes.search}>
              <form onSubmit={handleSearch} style={{ width: "100%" }}>
                <Autocomplete
                  id="combo-box"
                  options={rapperNames}
                  // freeSolo={true}
                  autoComplete={true}
                  noOptionsText={"Please select one of the listed artists"}
                  style={{ paddingLeft: 10, paddingBottom: 5 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search artists"
                      variant="standard"
                      name="search-query"
                      style={{
                        color: "white",
                      }}
                      InputProps={{
                        ...params.InputProps,
                        className: classes.searchInput,
                        disableUnderline: true,
                      }}
                    />
                  )}
                />
              </form>
            </div>
            <IconButton
              className={classes.searchIconButton}
              onClick={handleSearch}
            >
              <SearchIcon style={{ display: "inline" }} />
            </IconButton>
          </>
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