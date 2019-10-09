import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { modifyCurrentHP } from '../../../actions/combatActions';

const BlockMobHPEditor = props => {
  const [hpDelta, setHPDelta] = useState('');

  const handleClick = healing => {
    let delta = healing ? hpDelta : -hpDelta;
    props.modifyCurrentHP(delta, props.blockIdx, props.mobIdx);
    setHPDelta('');
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Button onClick={() => handleClick(true)}>Heal</Button>
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
        <Button onClick={() => handleClick(false)}>Damage</Button>
      </Grid>
    </Grid>
  );
};

export default connect(
  null,
  { modifyCurrentHP }
)(BlockMobHPEditor);
