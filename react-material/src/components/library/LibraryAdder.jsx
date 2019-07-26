import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import ActorCreator from '../utility/actorCreator.jsx';

const useStyles = makeStyles(theme => ({
  root: { marginTop: '10px' }
}));

const LibraryAdder = props => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ActorCreator
      className={classes.tabPanel}
      cb={(vals, childBack) => {
        console.log(vals);
        childBack();
      }}
    />
  );
};

export default LibraryAdder;
