import React from 'react';
import { connect } from 'react-redux';

import CombatManagerPresentation from './combatManagerPresentation.jsx';

const InitiativeListWrapper = props => {
  return <CombatManagerPresentation {...props} />;
};

const mapStateToProps = state => ({ blockOrder: state.app.combat.blockOrder });

export default connect(mapStateToProps)(InitiativeListWrapper);
