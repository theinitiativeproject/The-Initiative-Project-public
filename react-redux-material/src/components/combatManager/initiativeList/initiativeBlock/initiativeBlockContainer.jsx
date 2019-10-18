import React from 'react';
import { connect } from 'react-redux';

import InitiativeBlockPresentation from './initiativeBlockPresentation.jsx';

const InitiativeListBlockContainer = props => {
  return <InitiativeBlockPresentation {...props} />;
};

const mapStateToProps = state => {
  const { initiativeBlocks, combatants, activeBlock } = state.app.combat;
  return { initiativeBlocks, combatants, activeBlock };
};

export default connect(mapStateToProps)(InitiativeListBlockContainer);
