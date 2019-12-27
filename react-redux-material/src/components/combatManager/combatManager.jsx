import React from 'react';
import { useDispatch, useSelector } from "react-redux";

// component imports
import CombatControlsContainer from './CombatControls/CombatControlsContainer.jsx';
import InitiativeListContainer from './initiativeList/InitiativeListContainer.jsx';
import CombatAdderContainer from './combatAdder/combatAdderContainer.jsx';

// MUI imports
import { Grid } from '@material-ui/core';


const CombatManager = props => {
  return (
    <Grid container direction="column" justify="center" spacing={2}>
      <Grid item>
        <CombatControlsContainer />
      </Grid>
      <Grid item>
        <InitiativeListContainer />
      </Grid>
      <Grid item>
        <CombatAdderContainer />
      </Grid>
    </Grid>
  );
};

export default CombatManager;
