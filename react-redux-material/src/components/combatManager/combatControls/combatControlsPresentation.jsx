import React from 'react';

const CombatControlsPresentation = props => {
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

export default CombatControlsPresentation;
