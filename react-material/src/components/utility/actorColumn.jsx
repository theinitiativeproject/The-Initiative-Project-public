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
import ActorItem from '../utility/actorItem.jsx';

const useStyles = makeStyles(theme => ({}));

const ActorColumn = props => {
  const classes = useStyles();
  const [adding, setAdding] = useState(false);

  return (
    <Grid container className={props.className}>
      <Grid item container>
        {props.actors.map((mob, idx) => (
          <Grid item xs={12} key={idx}>
            <ActorItem actor={mob} editActor={props.editActor} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <ActorCreator
          cb={(vals, childBack) => {
            console.log(vals);
            childBack();
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ActorColumn;
