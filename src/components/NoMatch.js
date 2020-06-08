import React, {getDefaultProps} from 'react';

// import 'https://fonts.googleapis.com/css?family=Alfa+Slab+One';
const styles = {
  FourOhFour: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#121212",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundImage:
      'url("https://media.giphy.com/media/CZoOmrTeIeD6w/giphy.gif")',
    backgroundPosition: "center",
    zIndex: -5
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.6,
  },

  message: {
    fontFamily: "Roboto",
    height: "100%",
    color: "white",
    width: "100%",
    display: "flex",
    backgroundPosition: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundSize: "cover",
    justifyContent: "center",
    position: "relative",
    bottom: "5rem",
    paddingBottom: "5rem",
    opacity: 1,
    header: {
      fontSize: 144,
      display: "block",
      margin: 0,
      padding: 0
    },
    p: {
        fontSize: 32,
        display: "block",
        margin: 0,
        padding: 0,
    }
  },
};     

const NoMatch = () => {
    return (
      <div style={styles.FourOhFour}>
        <div style={{ ...styles.overlay }}>
        </div>
        <div style={styles.message}>
          <h2 style={styles.message.header}>404</h2>
          <p style={styles.message.p}>Resource Not Found</p>
        </div>
      </div>
    );
}

export default NoMatch;
