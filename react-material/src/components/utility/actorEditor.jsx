import React, { useState } from 'react';
import { Grid, Paper, TextField } from '@material-ui/core';

const ActorEditor = props => {
  console.log(props);
  const [values, setValues] = useState();

  return (
    <Paper>
      <Grid container spacing={2}>
        {Object.keys(props.actor).map((objKey, idx) => {
          return (
            <Grid item xs={4} key={idx}>
              <TextField
                margin="dense"
                label={objKey.charAt(0).toUpperCase() + objKey.slice(1)}
                value={props.actor[objKey]}
                name={objKey}
                onChange={props.handleStatChange}
              />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default ActorEditor;
