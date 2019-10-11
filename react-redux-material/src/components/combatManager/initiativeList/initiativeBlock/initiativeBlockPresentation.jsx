import React from 'react';

import { Paper, Grid, Typography } from '@material-ui/core';

import CombatantContainer from './combatant/combatantContainer.jsx';

const InitiativeBlockPresentation = props => {
  let block = props.initiativeBlocks[props.blockID];
  return (
    <Paper>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Typography>
            {block.initiative === -Infinity ? '?' : block.initiative}
          </Typography>
        </Grid>
        <Grid container item xs={9} direction="column" spacing={1}>
          {block.mobs.map((mobID, idxInBlock) => (
            <Grid item key={idxInBlock} className="source-of-weird-spacing">
              <CombatantContainer
                blockID={props.blockID}
                mobID={mobID}
                mob={props.combatants[mobID]}
                solo={block.mobs.length === 1}
              />
            </Grid>
          ))}
        </Grid>
        {props.blockID === props.activeBlock && (
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

export default InitiativeBlockPresentation;
