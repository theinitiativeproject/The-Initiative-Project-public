import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  healCurrentHP,
  damageCurrentHP
} from '../../../../../actions/combatActions.js';

const BlockMobHPEditor = props => {
  const [hpDelta, setHPDelta] = useState('');

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Button
          onClick={() => {
            props.healCurrentHP(hpDelta, props.mobID);
            setHPDelta('');
          }}
        >
          Heal
        </Button>
      </Grid>
      <Grid item>
        <TextField
          placeholder="Heal/Damage"
          type="number"
          margin="dense"
          value={hpDelta}
          onChange={e =>
            setHPDelta(e.target.value === '' ? '' : parseInt(e.target.value))
          }
        />
      </Grid>
      <Grid item>
        <Button
          onClick={() => {
            props.damageCurrentHP(hpDelta, props.mobID);
            setHPDelta('');
          }}
        >
          Damage
        </Button>
      </Grid>
    </Grid>
  );
};

export default connect(
  null,
  { healCurrentHP, damageCurrentHP }
)(BlockMobHPEditor);
