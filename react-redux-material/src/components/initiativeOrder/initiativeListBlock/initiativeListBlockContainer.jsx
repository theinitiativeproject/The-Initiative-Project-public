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
            {props.block.init === -Infinity ? '?' : props.block.init}
          </Typography>
        </Grid>
        <Grid container item xs={9} direction="column" spacing={1}>
          {props.block.mobs.map((mob, idxInBlock) => (
            <Grid item key={idxInBlock} className="source-of-weird-spacing">
              <InitiativeListBlockMob
                blockIdx={props.blockIdx}
                mobIdx={idxInBlock}
                mob={mob}
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
    </Paper>
  );
};

export default InitiativeListBlockContainer;
