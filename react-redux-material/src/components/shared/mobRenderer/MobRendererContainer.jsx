import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  deleteCombatantFromBlock,
  deleteLastCombatantFromBlock
} from '../../../actions/combatActions';

import ACPresentation from './AC/ACPresentation.jsx';
import HPPresentation from './HP/HPPresentation.jsx';
import HPEditorPresentation from './HP/HPEditor/HPEditorPresentation.jsx';
import CombatantName from './Name/combatantName.jsx';

import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
const useStyles = makeStyles(theme => ({
  'mob-renderer-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '3px'
  }
}));

const MobRendererContainer = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const combatants = useSelector(state => state.app.combat.combatants);
  const mob = combatants[props.mobID];

  const handleDelete = useCallback(() => {
    if (props.solo) {
      dispatch(deleteLastCombatantFromBlock(props.blockID, props.mobID));
    } else {
      dispatch(deleteCombatantFromBlock(props.blockID, props.mobID));
    }
  }, [dispatch, props.blockID, props.solo]);

  return (
    <div className={classes['mob-renderer-container']}>
      <CombatantName name={mob.name} mobID={props.mobID} />
      <ACPresentation ac={mob.ac} mobID={props.mobID} />
      <HPPresentation
        maxHP={mob.hp}
        currentHP={mob.currentHP}
        mobID={props.mobID}
      />
      <HPEditorPresentation mobID={props.mobID} />
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default MobRendererContainer;
