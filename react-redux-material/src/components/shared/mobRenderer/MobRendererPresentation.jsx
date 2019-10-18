import React from 'react';

import ACPresentation from './AC/ACPresentation.jsx';
import HPPresentation from './HP/HPPresentation.jsx';
import HPEditorContainer from './HP/HPEditor/HPEditorContainer.jsx';

// material UI
import { Grid, Typography, Button } from '@material-ui/core';

const MobRenderer = props => {
  console.log('mob renderer presentation props:');
  console.log(props);
  return (
    <Grid container direction="row">
      <Grid item xs>
        <Typography variant="h6">{props.mob.name}</Typography>
      </Grid>
      <Grid item xs>
        <ACPresentation ac={props.mob.ac} />
      </Grid>
      <Grid item xs>
        <HPEditorContainer mobID={props.mobID} />
      </Grid>
      <Grid item xs>
        <HPPresentation maxHP={props.mob.hp} currentHP={props.mob.currentHP} />
      </Grid>
      <Grid item xs>
        <Button onClick={props.handleDelete}>Delete</Button>
      </Grid>
    </Grid>
  );
};

export default MobRenderer;
