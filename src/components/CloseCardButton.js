import React from 'react';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const CloseCard = (props) => {

    return (
        <HighlightOffIcon onClick={props.closeInfoBox}/>
    )
}

export default CloseCard;