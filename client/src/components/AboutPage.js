import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import About from './About';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%', 
    padding: '3%', 
    display: 'flex', 
    alignItems:'center', 
    justifyContent:'center'
  },
}));

export default function AboutPage() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <About/>
    </div>
  );
}