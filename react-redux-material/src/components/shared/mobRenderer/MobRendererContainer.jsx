import React from 'react';
import { connect } from 'react-redux';
import MobRendererPresentation from './MobRendererPresentation.jsx';

const MobRendererContainer = props => {
  let mob = props.combatants[props.mobID];
  return <MobRendererPresentation mob={mob} {...props} />;
};

const mapStateToProps = state => ({ combatants: state.app.combat.combatants });

export default connect(mapStateToProps)(MobRendererContainer);
