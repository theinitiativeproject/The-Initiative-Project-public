import React from 'react';

// material UI
import { Grid, Typography } from 'material-ui';

const MobRenderer = props => {
  return (
    <Grid container direction="row">
      <Grid item xs>
        <Typography variant="h6">{props.mob.name}</Typography>
      </Grid>
      <Grid item xs>
        AC: {props.mob.ac}
      </Grid>
      <Grid item xs>
        HP: {props.mob.ac}
      </Grid>
    </Grid>
  );
};

export default MobRenderer;
