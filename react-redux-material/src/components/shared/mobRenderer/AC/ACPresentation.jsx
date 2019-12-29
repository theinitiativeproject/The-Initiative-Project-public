import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: 'url("./resources/icons/armor.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '65px',
    height: '65px'
  },
  gridBase: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '15px'
  },
  ac: {
    fontWeight: '450',
    fontSize: '1.3rem',
    lineHeight: '1.2rem'
  },
  subtitle: {
    paddingTop: '2px'
  }
}));

const ACPresentation = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.gridBase}>
        <Typography className={classes.ac}>
          {props.ac ? props.ac : '?'}
        </Typography>
        <Typography variant="caption" className={classes.subtitle}>
          AC
        </Typography>
      </div>
    </div>
  );
};

export default ACPresentation;
