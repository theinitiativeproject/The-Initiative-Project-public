import React from 'react';

import { Box, Typography } from '@material-ui/core';
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '15px'
  },
  divider: {
    height: '1px',
    background: 'black'
  },
  text: {
    fontSize: '1.1rem',
    fontWeight: '420',
    textAlign: 'center',
    lineHeight: '1rem',
    padding: '0px 3px'
  },
  unknownHPText: {
    padding: '5px 3px 0px',
    fontWeight: '450',
    fontSize: '1.3rem',
    lineHeight: '1.2rem'
  }
}));

const HPPresentation = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.displayBase}>
        {props.maxHP ? (
          <Box>
            <Typography className={classes.text}>{props.currentHP}</Typography>
            <div className={classes.divider} />
            <Typography className={classes.text}>{props.maxHP}</Typography>
          </Box>
        ) : (
          <Typography className={classes.unknownHPText}> ? </Typography>
        )}
      </div>
    </div>
  );
};

export default HPPresentation;
