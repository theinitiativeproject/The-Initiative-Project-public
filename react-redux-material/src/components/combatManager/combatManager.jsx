import React from 'react';

// component imports
import CombatControlsContainer from './CombatControls/CombatControlsContainer.jsx';
import InitiativeListContainer from './initiativeList/InitiativeListContainer.jsx';
import CombatAdderContainer from './combatAdder/combatAdderContainer.jsx';

const CombatManager = props => {
  return (
    <>
      <CombatControlsContainer />
      <InitiativeListContainer />
      <CombatAdderContainer />
    </>
  );
};

export default CombatManager;
