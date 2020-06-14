import React, {useEffect} from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
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
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const mediaBreakpoint = 400;
const useStyles = makeStyles(theme =>({
  root: {
    [theme.breakpoints.up(mediaBreakpoint)]:{
      width: 350,
      borderRadius: '0.25rem 2.5rem 2.5rem 2.5rem',
      padding: '.5rem',
    },
    [theme.breakpoints.down(mediaBreakpoint)]: {
      width: 300,
      height: 300,
      position: 'absolute',
      bottom: 15,
      left: 15
    },
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
}));

function RapperCard(props) {
  const classes = useStyles();

  useEffect( ()=>{
      (async () => {
        await props.loadAdditionalInfo(props.activeRapper)
      })();

  })
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
          <span>
            <b>Origins: </b>
            {props.fields.location_neighborhood
              ? `${props.fields.location_neighborhood}, ${props.fields.location_city}`
              : `${props.fields.location_city}`}
          </span>
          <HighlightOffIcon 
            onClick={props.removeActiveStatus} 
            style={{ height: 60, paddingRight: 10, cursor: "pointer", zIndex:10 }}
          />
        </Typography>
        <Typography variant="h5" component="h2">
          {props.fields.name}
        </Typography>
        <Typography variant="body2" component="p">
          <p>
            <b>Bio: </b>
            {props.fields.bio_summary}
          </p>
        </Typography>
      </CardContent>
      <CardActions>
        <MoreInfoModal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          rapper={props.activeRapper}
        />
      </CardActions>
    </Card>
  );
}

const RapperInfoBox = (props) => {

    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up(mediaBreakpoint));

    return ( <>
      {largeScreen ? 
        <InfoBox
          options={
            { closeBoxURL: ``, enableEventPropagation: true }
          }
        >
          <RapperCard {...props}/>
        </InfoBox> : 
      <RapperCard {...props}/>}
      </>
    );
}

const mapStateToProps = (state) => {
  return {
    activeRapper: state.rappers.activeRapper
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeActiveStatus: () => dispatch(noActiveRapper()),
    loadAdditionalInfo: (rapper) => dispatch(loadAdditionalInfo(rapper)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RapperInfoBox);

