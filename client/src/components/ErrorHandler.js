import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {connect} from 'react-redux';
import {clearErrorMessages} from '../store/errorHandler';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function ErrorHandler(props) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.clearErrorMessages()
  };

  return (
    <>
        {props.numErrors ? (<div className={classes.root}>
            {props.errors.map( (error, i) =>{
            return (
                <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {error}
                    </Alert>            
                </Snackbar>)
            })}
            

        </div>) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state.errorHandler.errors,
    numErrors: state.errorHandler.errors.length,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearErrorMessages: () => dispatch(clearErrorMessages()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);
