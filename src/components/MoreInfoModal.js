import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";



const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: 'none',
    maxWidth: 400,
    
    display: 'block',
  },
  avatar: {
    margin: '0 auto',
    alignSelf: "center",
    borderRadius: "3em",
    width: 160
  },
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
  console.log("RAPPER MODAL", props.rapper)

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
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
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
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <b>Origins: </b>
                  {props.rapper.fields.location_neighborhood
                    ? `${props.rapper.fields.location_neighborhood}, ${props.rapper.fields.location_city}`
                    : `${props.rapper.fields.location_city}`}
                </Typography>
                {props.rapper.fields.bio_yearsactivestart ? (
                  <Typography className={classes.pos} color="textSecondary">
                    <b>Active since: </b>
                    {props.rapper.fields.bio_yearsactivestart}
                  </Typography>
                ) : null}
                <Typography variant="body2" component="p">
                  <p>
                    <b>Bio: </b>
                    {props.rapper.fields.bio_summary}
                  </p>
                </Typography>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

