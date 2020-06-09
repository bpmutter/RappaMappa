import React from "react";
import Button from "@material-ui/core/Button";
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
  console.log('ERRORS IN HANDLER::', props.numErrors)
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
    console.log("HOW MANY ERRORS::", state.errorHandler.errors.length);
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

// import React, {useEffect, useState} from "react";
// import Button from "@material-ui/core/Button";
// import Snackbar from "@material-ui/core/Snackbar";
// import {connect} from 'react-redux';
// import {clearErrorMessages} from '../store/errorHandler';
// import { makeStyles } from "@material-ui/core/styles";
// import SnackbarContent from "@material-ui/core/SnackbarContent";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 600,
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//     zIndex: 20
//   },
// }));

// function ErrorHandler(props) {
//   const classes = useStyles();
//   const [isOpen, setOpen] = useState(true);


//   useEffect(()=>{
//     // console.log("ERRORS::", props.errors);
//     if(props.errors.length){
//         setOpen(true);
//     }    
//   },);

// //   const handleClick = () => {
// //       setState({open: true})
// //   }


//   const handleClose = () => {
//     setOpen(false);
//     props.clearErrorMessages();
//   };

//   return (
//     <>
//     <div>
//       <SnackbarContent
//         open={isOpen}
//         className={classes.root}
//         onClose={handleClose}
//         message="I love snacks"
//       />
//     </div>
//     </>
//   );
// }


