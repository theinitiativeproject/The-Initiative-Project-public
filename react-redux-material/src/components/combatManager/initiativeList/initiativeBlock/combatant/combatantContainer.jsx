import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  deleteCombatantFromBlock,
  deleteLastCombatantFromBlock
} from '../../../../../actions/combatActions';

import CombatantPresentation from './combatantPresentation.jsx';

const CombatContainer = props => {
  const handleDelete = (blockID, mobID) => {
    if (props.solo) {
      props.deleteLastCombatantFromBlock(blockID, mobID);
    } else {
      props.deleteCombatantFromBlock(blockID, mobID);
    }
  };

  return <CombatantPresentation {...props} handleDelete={handleDelete} />;
};

export default connect(
  null,
  { deleteCombatantFromBlock, deleteLastCombatantFromBlock }
)(CombatContainer);
