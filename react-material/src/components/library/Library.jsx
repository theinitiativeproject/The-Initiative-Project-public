import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ActorCreator from '../utility/actorCreator.jsx';
import ActorItem from '../utility/actorItem.jsx';
import ActorColumn from '../utility/actorColumn.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    width: '500px',
    backgroundColor: '#DFE1E6'
  },
  tabPanel: {
    padding: '20px'
  }
}));

const Library = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  const handleChangeIndex = idx => {
    setValue(idx);
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="SRD" disableRipple />
          <Tab label="Homebrew" disableRipple />
          <Tab label="Party" disableRipple />
        </Tabs>
      </AppBar>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <Box value={value} index={0} className={classes.tabPanel}>
          srd mobs
        </Box>
        <Box value={value} index={1} className={classes.tabPanel}>
          <ActorColumn
            actors={props.homebrewMonsters}
            editActor={props.editActor}
            addActor={props.addActor}
            removeActor={props.removeActor}
            category="homebrewMonsters"
            editable
          />
        </Box>
        <Box value={value} index={2} className={classes.tabPanel}>
          party members
        </Box>
      </SwipeableViews>
    </Box>
  );
};

export default Library;
