import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  healCurrentHP,
  damageCurrentHP
} from '../../../../../actions/combatActions.js';

import { Button, Grid, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  'hp-editor-container': {
    display: 'flex',
    flexDirection: 'column',
    width: '146px'
  },
  'button-container': {
    display: 'flex',
    marginBottom: '3px'
  },
  'heal-button': { marginRight: '2px' },
  'damage-button': { marginLeft: '2px' }
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
    <div className={classes['hp-editor-container']}>
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
      <div className={classes['button-container']}>
        <Button
          className={classes['heal-button']}
          fullWidth
          size="small"
          variant="outlined"
          onClick={healCurrentHPWrapper}
        >
          Heal
        </Button>
        <Button
          className={classes['damage-button']}
          fullWidth
          size="small"
          variant="outlined"
          onClick={damageCurrentHPWrapper}
        >
          Damage
        </Button>
      </div>
    </div>
  );
};

export default HPEditorPresentation;
