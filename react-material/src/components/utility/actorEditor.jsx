import React, { useState } from 'react';
import { Grid, Paper, TextField } from '@material-ui/core';

const mods = ['init', 'str', 'dex', 'con', 'int', 'wis', 'cha'];
const ActorEditor = props => {
  console.log(props);
  return (
    <Paper>
      <Grid container spacing={2}>
        {mods.map((mod, idx) => {
          return (
            <Grid item xs={4} key={idx}>
              <TextField
                margin="dense"
                label={mod.charAt(0).toUpperCase() + mod.slice(1)}
                value={props.mods[`${mod}${mod === 'init' ? 'Mod' : 'Save'}`]}
                name={`${mod}${mod === 'init' ? 'Mod' : 'Save'}`}
                onChange={props.handleChange}
              />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default ActorEditor;
