import React from 'react';
import { connect } from 'react-redux';
import { incrementTurn } from '../../../actions/combatActions';

const InitiativeListControls = props => {
  return (
    <div>
      <span>Active Turn: {props.activeBlock} </span>
      <button onClick={props.incrementTurn}>Increment Turn</button>
    </div>
  );
};

const mapStateToProps = state => ({
  activeBlock: state.app.combat.activeBlock
});
export default connect(
  mapStateToProps,
  { incrementTurn }
)(InitiativeListControls);
