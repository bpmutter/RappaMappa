import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import {connect} from 'react-redux';
import {clearErrorMessages} from '../store/errorHandler';

function ErrorHandler(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
    props.clearErrorMessages();
  };

  const button = (
    <React.Fragment>
      <Button onClick={handleClick({ vertical: "top", horizontal: "center" })}>
        Top-Center
      </Button>
    </React.Fragment>
  );

  return (
    <>
    { props.errors && props.errors.length ? <div>
      {button}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </div>: null}</>
  );
}

const mapStateToProps = (state) => {
  
  return {
    errors: state.errorHandler.errors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearErrorMessages: () => dispatch(clearErrorMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);
