import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  healCurrentHP,
  damageCurrentHP
} from '../../../../../actions/combatActions.js';

import { Button, Grid, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  gridBase: { width: '146px' }
}));

const HPEditorPresentation = props => {
  const classes = useStyles();

  const [hpDelta, setHPDelta] = useState('');
  const dispatch = useDispatch();

  const healCurrentHPWrapper = useCallback(() => {
    dispatch(healCurrentHP(hpDelta, props.mobID));
    setHPDelta('');
  }, [dispatch, hpDelta]);

  const damageCurrentHPWrapper = useCallback(() => {
    dispatch(damageCurrentHP(hpDelta, props.mobID));
    setHPDelta('');
  }, [dispatch, hpDelta]);

  return (
    <Grid container direction="column" className={classes.gridBase}>
      <Grid item>
        <TextField
          fullWidth
          placeholder="Heal / Damage"
          type="number"
          margin="dense"
          value={hpDelta}
          onChange={e => {
            setHPDelta(e.target.value === '' ? '' : parseInt(e.target.value));
            console.log(hpDelta);
          }}
        />
      </Grid>
      <Grid item>
        <Box>
          <Grid container direction="row" spacing={1}>
            <Grid item>
              <Button
                className={classes.hpEditButton}
                fullWidth
                size="small"
                variant="outlined"
                onClick={healCurrentHPWrapper}
              >
                Heal
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.hpEditButton}
                fullWidth
                size="small"
                variant="outlined"
                onClick={damageCurrentHPWrapper}
              >
                Damage
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HPEditorPresentation;
