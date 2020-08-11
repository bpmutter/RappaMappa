import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import About from "./About";

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    width: 450,
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  iconButton: {
    backgroundColor: "rgba(2,18,26, .65)",
    borderRadius: "50%",
    height: 50,
    width: 50,
    padding: 5,
    position: "absolute",
    bottom: 100,
    left: 15,
    zIndex: 25,
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "&:hover": {
      backgroundColor: "rgba(2,18,26, .85)",
    },
  },
  icon: {
    color: "#FDBC40",
    fontSize: '3em',

  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AboutModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.iconButton} onClick={handleClickOpen}>
        <HelpOutlineIcon className={classes.icon}/>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-contact-info"
        aria-describedby="alert-dialog-ben-perlmutter-contact-information"
        className={classes.dialog}
      >
        <About/>
      </Dialog>
    </div>
  );
}
