import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import SearchBox from "./SearchBox";
import {Link} from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "static",
    zIndex: 10,
    height: 65,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  //hic sunt dracones - git commit before any edits to search
  //very finnicky
  
}));

export default function SearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const goToGithub = (e) => {
    e.preventDefault();
    window.open("https://github.com/bpmutter/RappaMappa", "_blank");
    handleClose();
  }
  return (
    <div className={classes.root}>
      <AppBar style={{ height: 65 }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose} component={Link} to={"/"}>
              Home
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to={"/about"}>
              About
            </MenuItem>
            <MenuItem onClick={goToGithub}>Github</MenuItem>
          </Menu>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              RappaMappa
            </Link>
          </Typography>
          <SearchBox />
        </Toolbar>
      </AppBar>
    </div>
  );
}

