import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position:"absolute",
    width: "100%",
    height: "90%",
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#02121A',
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function LoadingSpinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}
