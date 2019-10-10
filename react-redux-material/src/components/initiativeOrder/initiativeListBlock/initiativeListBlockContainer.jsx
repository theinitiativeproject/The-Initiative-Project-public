import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button, Typography } from '@material-ui/core';

import InitiativeListBlockMob from './initiativeListBlockMob.jsx';

const InitiativeListBlockContainer = props => {
  return (
    <Paper>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Typography>
            {props.block.initiative === -Infinity
              ? '?'
              : props.block.initiative}
          </Typography>
        </Grid>
        <Grid container item xs={9} direction="column" spacing={1}>
          {props.block.mobs.map((mobID, idxInBlock) => (
            <Grid item key={idxInBlock} className="source-of-weird-spacing">
              <InitiativeListBlockMob
                blockID={props.blockID}
                mobID={mobID}
                mob={props.combatants[mobID]}
                solo={props.block.mobs.length === 1}
              />
            </Grid>
          ))}
        </Grid>
        {props.active && (
          // replace this bullshit with classname toggle + CSS
          <Grid item xs={2}>
            <span>{'     <----- this is the active block'}</span>
          </Grid>
        )}
      </Grid>
      <div>{props.blockID}</div>
    </Paper>
  );
};

export default InitiativeListBlockContainer;
