import React from 'react';
import { connect } from 'react-redux';
import { incrementTurn, resetTurn } from '../../../actions/combatActions';

import CombatControlsPresentation from './combatControlsPresentation.jsx';

const CombatControlsContainer = props => {
  return <CombatControlsPresentation {...props} />;
};

const mapStateToProps = state => ({
  activeBlock: state.app.combat.activeBlock
});

export default connect(
  mapStateToProps,
  { incrementTurn, resetTurn }
)(CombatControlsContainer);
