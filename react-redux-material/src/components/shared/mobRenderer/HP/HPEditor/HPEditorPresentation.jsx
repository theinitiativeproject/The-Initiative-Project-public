import React, { useState } from 'react';
import { Button, Grid, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  gridBase: { width: '146px' }
}));

const HPEditorPresentation = props => {
  const [hpDelta, setHPDelta] = useState('');
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.gridBase}>
      <Grid item>
        <TextField
          fullWidth
          placeholder="Heal / Damage"
          type="number"
          margin="dense"
          value={hpDelta}
          onChange={e =>
            setHPDelta(e.target.value === '' ? '' : parseInt(e.target.value))
          }
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
                onClick={() => {
                  props.healCurrentHP(hpDelta, props.mobID);
                  setHPDelta('');
                }}
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
                onClick={() => {
                  props.damageCurrentHP(hpDelta, props.mobID);
                  setHPDelta('');
                }}
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
