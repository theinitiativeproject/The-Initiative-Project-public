import React, { useState } from 'react';
import { Grid, Paper, TextField } from '@material-ui/core';

const ActorEditor = props => {
  console.log(props);
  const [values, setValues] = useState(props.actor);

  const handleChange = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleBlur = e => {
    props.editActor(values.id, values);
  };

  return (
    <Paper>
      <Grid container spacing={2}>
        <div>add discard changes button</div>
        {Object.keys(props.actor).map((objKey, idx) => {
          return (
            <Grid item xs={4} key={idx}>
              <TextField
                margin="dense"
                label={objKey.charAt(0).toUpperCase() + objKey.slice(1)}
                value={values[objKey]}
                name={objKey}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default ActorEditor;
