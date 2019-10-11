import React, { useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import BlockMobHPEditor from './blockMobHPEditor.jsx';

const CombatantPresentation = props => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid container direction="row" spacing={2} alignItems="center">
      <Grid item xs={2}>
        <Typography>{props.mob.name}</Typography>
      </Grid>
      <Grid item onClick={() => setExpanded(!expanded)}>
        <Typography>
          HP:{' '}
          {props.mob.hp === '' ? '?' : props.mob.currentHP + '/' + props.mob.hp}
        </Typography>
      </Grid>
      {(expanded || props.solo) && props.mob.hp !== '' && (
        <Grid item>
          <BlockMobHPEditor mobID={props.mobID} />
        </Grid>
      )}
      <Grid item>
        <Typography>AC: {props.mob.ac === '' ? '?' : props.mob.ac}</Typography>
      </Grid>
      <Grid item>
        <Button onClick={() => props.handleDelete(props.blockID, props.mobID)}>
          Delete Mob
        </Button>
      </Grid>
    </Grid>
  );
};

export default CombatantPresentation;
