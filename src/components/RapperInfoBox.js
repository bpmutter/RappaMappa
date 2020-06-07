import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import CloseCardButton from './CloseCardButton';
import { noActiveRapper } from "../store/rappers";
import {connect} from 'react-redux';
import MoreInfoModal from "./MoreInfoModal";
import { loadAdditionalInfo } from "../store/rappers";


const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function RapperCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: { display: "inline-block" },
          }}
        >
          <p>
            <b>Origins: </b>
            {props.fields.location_neighborhood
              ? `${props.fields.location_neighborhood}, ${props.fields.location_city}`
              : `${props.fields.location_city}`}
          </p>
          <CloseCardButton
            style={{ height: 60, paddingRight: 10, cursor: "pointer" }}
            closeInfoBox={props.removeActiveStatus}
          />
        </Typography>
        <Typography variant="h5" component="h2">
          {props.fields.name}
        </Typography>
        {props.fields.bio_yearsactivestart ? (
          <Typography className={classes.pos} color="textSecondary">
            <p>
              <b>Active since: </b>
              {props.fields.bio_yearsactivestart}
            </p>
          </Typography>
        ) : null}
        <Typography variant="body2" component="p">
          <p>
            <b>Bio: </b>
            {props.fields.bio_summary}
          </p>
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">More</Button> */}
        <MoreInfoModal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        />
      </CardActions>
    </Card>
  );
}

const RapperInfoBox = (props) => {
  debugger;
    return (
      <InfoBox
        // onCloseClick={props.removeActiveStatus}
        options={
          { closeBoxURL: ``, enableEventPropagation: true }
        }
      >
        <RapperCard {...props}/>
      </InfoBox>
    );
}

const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeActiveStatus: () => dispatch(noActiveRapper()),
    loadAdditionalInfo: (rapper) => dispatch(loadAdditionalInfo(rapper)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RapperInfoBox);

