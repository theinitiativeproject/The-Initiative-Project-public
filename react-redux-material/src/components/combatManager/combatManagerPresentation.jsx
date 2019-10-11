import React from 'react';

// component imports
import CombatControlsContainer from './CombatControls/CombatControlsContainer.jsx';
import InitiativeBlockContainer from './initiativeList/initiativeBlock/InitiativeBlockContainer.jsx';
import CombatAdderContainer from './combatAdder/combatAdderContainer.jsx';

// MUI imports
import { Grid } from '@material-ui/core';

const CombatManagerPresentation = props => {
  return (
    <Grid container direction="column" justify="center" spacing={2}>
      <Grid item>
        <CombatControlsContainer />
      </Grid>
      {props.blockOrder.map((blockID, idx) => (
        <Grid item key={idx}>
          <InitiativeBlockContainer
            blockID={blockID}
            // block={props.initiativeBlocks[blockID]}
            // combatants={props.combatants}
            // active={props.activeBlock === blockID}
          />
        </Grid>
      ))}
      <Grid item>
        <CombatAdderContainer />
      </Grid>
    </Grid>
  );
};

export default CombatManagerPresentation;
