import React from 'react';

// component imports
import CombatControlsContainer from './CombatControls/CombatControlsContainer.jsx';
import InitiativeListContainer from './initiativeList/InitiativeListContainer.jsx';
import CombatAdderContainer from './combatAdder/combatAdderContainer.jsx';

// MUI imports
import { Grid } from '@material-ui/core';

const CombatManagerPresentation = props => {
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

export default CombatManagerPresentation;
