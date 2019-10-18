import React from 'react';

import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import MobRendererContainer from '../../../shared/mobRenderer/MobRendererContainer.jsx';

const useStyles = makeStyles(theme => ({
  activeBlock: {
    background: 'green'
  }
}));

const InitiativeBlockPresentation = props => {
  let block = props.initiativeBlocks[props.blockID];
  const classes = useStyles();
  return (
    <Paper>
      <Grid container alignItems="center">
        <Grid
          item
          xs={1}
          className={
            props.blockID === props.activeBlock ? classes.activeBlock : ''
          }
        >
          <Typography>
            {block.initiative === -Infinity ? '?' : block.initiative}
          </Typography>
        </Grid>
        <Grid container item xs={9} direction="column" spacing={1}>
          {block.mobs.map((mobID, idxInBlock) => (
            <Grid item key={idxInBlock} className="source-of-weird-spacing">
              <MobRendererContainer
                blockID={props.blockID}
                mobID={mobID}
                mob={props.combatants[mobID]}
                solo={block.mobs.length === 1}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InitiativeBlockPresentation;
