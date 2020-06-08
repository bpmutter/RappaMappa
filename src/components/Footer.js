import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";


export default function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Made with 💜 by "}
      <Link color="inherit" href="https://ben.perlmutter.io/">
        Ben Perlmutter,
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
