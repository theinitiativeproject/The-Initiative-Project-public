import React from 'react';
import { connect } from 'react-redux';

import InitiativeListPresentation from './InitiativeListPresentation.jsx';

const InitiativeListContainer = props => {
  return <InitiativeListPresentation blockOrder={props.blockOrder} />;
};

const mapStateToProps = state => ({ blockOrder: state.app.combat.blockOrder });

export default connect(mapStateToProps)(InitiativeListContainer);
