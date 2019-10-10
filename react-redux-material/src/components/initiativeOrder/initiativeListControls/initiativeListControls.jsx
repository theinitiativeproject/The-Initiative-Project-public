import React from 'react';
import { connect } from 'react-redux';
import { incrementTurn, resetTurn } from '../../../actions/combatActions';

const InitiativeListControls = props => {
  return (
    <div>
      <span>Active Turn: {props.activeBlock} </span>
      <button onClick={() => props.incrementTurn(props.activeBlock)}>
        {props.activeBlock === '' ? 'Start Combat!' : 'Increment Turn'}
      </button>
      <button onClick={props.resetTurn}>Reset Turn</button>
    </div>
  );
};

export default connect(
  null,
  { incrementTurn, resetTurn }
)(InitiativeListControls);
