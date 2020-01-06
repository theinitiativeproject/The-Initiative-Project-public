import React, { useRef } from 'react';

import { TextField } from '@material-ui/core';

// component imports
import CombatControlsContainer from './CombatControls/CombatControlsContainer.jsx';
import InitiativeListContainer from './initiativeList/InitiativeListContainer.jsx';
import CombatAdderContainer from './combatAdder/combatAdderContainer.jsx';

import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  'combat-manager-container': {
    maxHeight: '75vh',
    display: 'flex',
    flexDirection: 'column'
  },
  'initiative-list-container': {
    overflowY: 'auto'
  }
}));

const CombatManager = props => {
  const classes = useStyles();
  return (
    <div className={classes['combat-manager-container']}>
      <CombatControlsContainer />
      <div className={classes['initiative-list-container']}>
        <InitiativeListContainer />
      </div>
      <CombatAdderContainer />
    </div>
  );
};

export default CombatManager;
