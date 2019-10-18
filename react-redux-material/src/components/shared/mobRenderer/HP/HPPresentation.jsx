import React, { useState } from 'react';

import { Box, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: 'url("./resources/icons/heart.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '65px',
    height: '65px'
  },
  displayBase: {
    paddingTop: '15px',
    margin: 'auto',
    width: 'min-content'
  },
  divider: {
    height: '1px',
    background: 'black'
  },
  text: {
    fontSize: '1.1rem',
    fontWeight: '420',
    textAlign: 'center',
    lineHeight: '1rem'
  },
  unknownHPText: {
    paddingTop: '5px',
    fontWeight: '450',
    fontSize: '1.3rem',
    lineHeight: '1.2rem'
  }
}));

const HPPresentation = props => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.displayBase}>
        {props.maxHP ? (
          <Box>
            <Typography className={classes.text}>{props.currentHP}</Typography>
            <div className={classes.divider} />
            <Typography className={classes.text}>{props.maxHP}</Typography>
          </Box>
        ) : (
          <Typography className={classes.unknownHPText}> ? </Typography>
        )}
      </Box>
    </Box>
  );
};

export default HPPresentation;
