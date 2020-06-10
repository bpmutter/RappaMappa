import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from "@material-ui/icons/Twitter";
import WebIcon from "@material-ui/icons/Web";
import '../assets/style/Footer.css';
export default function Footer() {

    return (
      <>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Made with 💜 by "}
            Ben Perlmutter,{" "}
          {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link color="inherit" href="https://ben.perlmutter.io/" target="_blank" rel="noopener">
            <WebIcon className="footer__icon" />
          </Link>
          <Link color="inherit" href="https://github.com/bpmutter" target="_blank" rel="noopener">
            <GitHubIcon className="footer__icon" />
          </Link>
          <Link color="inherit" href="https://twitter.com/bpmutter" target="_blank" rel="noopener">
            <TwitterIcon className="footer__icon" />
          </Link>
        </Typography>
      </>
    );
}
