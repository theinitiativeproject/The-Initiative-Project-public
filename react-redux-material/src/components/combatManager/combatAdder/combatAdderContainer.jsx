import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  addCombatantBlock,
  addCombatantToBlock
} from '../../../actions/combatActions';

import CombatAdderPresentation from './combatAdderPresentation.jsx';

const InitiativeListAdder = props => {
  const addAsNewBlock = values => {
    const { initiative, ...mob } = values;
    props.addCombatantBlock(
      mob,
      typeof values.initiative === 'number' ? initiative : -Infinity
    );
  };

  const addToExistingBlock = (values, targetBlock) => {
    const { initiative, ...mob } = values;
    props.addCombatantToBlock(mob, targetBlock);
  };

  return (
    <CombatAdderPresentation
      blockOrder={props.blockOrder}
      addAsNewBlock={addAsNewBlock}
      addToExistingBlock={addToExistingBlock}
    />
  );
};

const mapStateToProps = state => ({ blockOrder: state.app.combat.blockOrder });

export default connect(
  mapStateToProps,
  { addCombatantBlock, addCombatantToBlock }
)(InitiativeListAdder);
