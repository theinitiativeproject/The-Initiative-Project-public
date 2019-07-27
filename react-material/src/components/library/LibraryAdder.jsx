import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Collapse from '@material-ui/core/Collapse';

import ActorCreator from '../utility/actorCreator.jsx';

const useStyles = makeStyles(theme => ({
  root: { marginTop: '10px' },
  addActor: {
    justifyContent: 'left',
    color: '#757575'
  }
}));

const LibraryAdder = props => {
  const classes = useStyles();
  const theme = useTheme();

  const [values, setValues] = useState({
    open: false
  });

  const openCreator = () => {
    setValues({ ...values, open: true });
  };

  const closeCreator = () => {
    setValues({ ...values, open: false });
  };

  return (
    <Box className={classes.root}>
      {!values.open && (
        <Button
          variant="text"
          fullWidth={true}
          className={classes.addActor}
          onClick={openCreator}
        >
          <AddIcon />
          Add another homebrew monster
        </Button>
      )}
      {values.open && (
        <ClickAwayListener onClickAway={closeCreator}>
          <div>
            <ActorCreator
              className={classes.tabPanel}
              closeCreator={closeCreator}
              addActor={props.addActor}
              category={props.category}
            />
          </div>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default LibraryAdder;
