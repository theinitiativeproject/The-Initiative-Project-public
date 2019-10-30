import React from 'react';

import { connect } from 'react-redux';
import {
  deleteCombatantFromBlock,
  deleteLastCombatantFromBlock
} from '../../../actions/combatActions';

import MobRendererPresentation from './MobRendererPresentation.jsx';

const MobRendererContainer = props => {
  let mob = props.combatants[props.mobID];
  const handleDelete = () => {
    if (props.solo) {
      props.deleteLastCombatantFromBlock(props.blockID, props.mobID);
    } else {
      props.deleteCombatantFromBlock(props.blockID, props.mobID);
    }
  };
  return (
    <MobRendererPresentation
      mobID={props.mobID}
      mob={mob}
      handleDelete={handleDelete}
    />
  );
};

const mapStateToProps = state => ({ combatants: state.app.combat.combatants });

export default connect(
  mapStateToProps,
  { deleteCombatantFromBlock, deleteLastCombatantFromBlock }
)(MobRendererContainer);
