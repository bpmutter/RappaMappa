import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    outline: 'none',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 400,
    outline: 'none',
    margin: 15,
    display: "flex",
    flexDirection: 'column',
    alignItems: 'flex-start',

  },
  avatar: {
    margin: "0 auto",
    alignSelf: "center",
    borderRadius: "3em",
    width: 160,
    marginBottom: '1rem',
  },
  originWrapper: {
    margin: '.5rem 0 1rem'
  },
  originField: {
    paddingRight: '1rem',
  },
  mainInfoField: {
    marginBottom: '.5rem'
  },
  playButton: {
    alignSelf: 'center'
  }
}));

export default function MoreInfoModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const spotifyRedirectHandler = (e) => {
    //TODO
    e.preventDefault();
    if(props.rapper && props.rapper.additionalInfo){
      window.open(props.rapper.additionalInfo.external_urls.spotify, "_blank");
    }
  }
  console.log("RAPPER MODAL", props.rapper);

  let subgenres = "";
  if(props.rapper && props.rapper.additionalInfo){
    subgenres = props.rapper.additionalInfo.genres.join(", ");
  }
  let popularity = "";
  if(props.rapper && props.rapper.additionalInfo){
    const popularityScore = props.rapper.additionalInfo.popularity;
    if(popularityScore >= 90) popularity = "🔥🔥🔥🔥🔥";
    else if(popularityScore >= 80) popularity = "🔥🔥🔥🔥";
    else if(popularityScore >= 65) popularity = "🔥🔥🔥";
    else if(popularityScore >= 40) popularity = "🔥🔥";
    if(popularityScore < 40 ) popularity = "🔥";
  }
  return (
    <div>
      <Button size="small" onClick={handleOpen}>
        Music & More
      </Button>

      <Modal
        aria-labelledby="rapper-more-info"
        aria-describedby="addition-info-for-rapper"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableAutoFocus={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} disableAutoFocus={true}>
          <Paper className={classes.paper} disableAutoFocus={true}>
            {!props.rapper.additionalInfo ? (
              <>
                <h2 id="rapper-more-info">Aww snap!</h2>
                <p id="addition-info-for-rapper">
                  It looks like there was an issue loading the data from
                  Spotify. Please try again later.
                </p>
              </>
            ) : (
              <>
                <img
                  className={classes.avatar}
                  src={props.rapper.additionalInfo.images[1].url}
                  alt={props.rapper.fields.name}
                />
                <Typography component="h2" variant="h4">
                  {props.rapper.fields.name}
                </Typography>
                <Box
                  className={classes.originWrapper}
                  display="flex"
                  flexDirection="row"
                  flexWrap="wrap"
                  justifyContent="space-between"
                >
                  <Box className={classes.originField}>
                    <Typography color="textSecondary">
                      <b>Origins: </b>
                      {props.rapper.fields.location_neighborhood
                        ? `${props.rapper.fields.location_neighborhood}, ${props.rapper.fields.location_city}`
                        : `${props.rapper.fields.location_city}`}
                    </Typography>
                  </Box>
                  <Box className={classes.originField}>
                    {props.rapper.fields.bio_yearsactivestart ? (
                      <Typography color="textSecondary">
                        <b>Active since: </b>
                        {props.rapper.fields.bio_yearsactivestart}
                      </Typography>
                    ) : null}
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.mainInfoField}
                >
                  <b>Bio: </b>
                  {props.rapper.fields.bio_summary}
                </Typography>
                {subgenres ? (
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.mainInfoField}
                  >
                    <b>Subgenres: </b>
                    <span>{subgenres}</span>
                  </Typography>
                ) : null}

                <Typography
                  variant="body1"
                  component="p"
                  className={classes.mainInfoField}
                >
                  <b>Popularity: </b>
                  <span>{popularity}</span>
                </Typography>
                <Button
                  onClick={spotifyRedirectHandler}
                  style={{ alignSelf: "center" }}
                >
                  <PlayCircleOutlineIcon />
                  &nbsp; Listen on Spotify
                </Button>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

