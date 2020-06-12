import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Footer from './Footer';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%', 
    padding: '3%', 
    display: 'flex', 
    alignItems:'center', 
    justifyContent:'center'
  },
  paper: {
    marginTop: theme.spacing(8),
    maxWidth: 500,
    padding: '10px 20px',
    boxSizing: 'border-box',
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "lightgrey",
    alignSelf: 'center',
    padding: theme.spacing(1)
  },
  title: {
      alignSelf: 'center',
      paddingBottom: theme.spacing(1.5),
  },
  p: {
      paddingBottom: theme.spacing(1),
  }
}));

export default function AboutPage() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Paper
        component="main"
        style={{ maxWidth: 550}}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            src="/img/rappa-mappa-logo.png"
          ></Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            About RappaMappa
          </Typography>
          <Typography
            component="p"
            variant="body1"
            align="left"
            className={classes.p}
          >
            The title pretty much says it all. RappaMappa is an interactive map
            of rappers. You can browse around the map, search for rappers, and
            see some details about the artists.
          </Typography>
          <Typography
            component="p"
            variant="body1"
            align="left"
            className={classes.p}
          >
            Also be sure to check out the 'More' button on the rappers to see
            additional info and some choice songs that you can listen to on
            Spotify.
          </Typography>
          <Typography
            component="p"
            variant="body1"
            align="left"
            className={classes.p}
          >
            If you'd like to learn more about RappaMappa and how it was made,
            check out the{" "}
            <Link
              href="https://github.com/bpmutter/RappaMappa"
              target="_blank"
              rel="noopener"
            >
              Github
            </Link>
            .
          </Typography>
          {/* </section> */}
        </div>
        <Box mt={5}>
          <Footer />
        </Box>
      </Paper>
    </div>
  );
}