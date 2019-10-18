import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
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
    paddingTop: '15px'
  },
  ac: {
    fontWeight: '450',
    fontSize: '1.3rem',
    lineHeight: '1.2rem'
  },
  subtitle: {
    lineHeight: '0'
  }
}));

const ACPresentation = props => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.gridBase}
      >
        <Grid item>
          <Typography className={classes.ac}>
            {props.ac ? props.ac : '?'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption" className={classes.subtitle}>
            AC
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ACPresentation;
