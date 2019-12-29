import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementTurn, resetTurn } from '../../../actions/combatActions';

const CombatControlsContainer = props => {
  const activeBlock = useSelector(state => state.app.combat.activeBlock);
  const dispatch = useDispatch();

  const incrementTurnWrapper = useCallback(
    activeBlock => dispatch(incrementTurn(activeBlock)),
    [dispatch, activeBlock]
  );
  const resetTurnWrapper = useCallback(() => dispatch(resetTurn()), dispatch);

  return (
    <div>
      <span>Active Turn: {activeBlock} </span>
      <button onClick={incrementTurnWrapper}>
        {activeBlock === '' ? 'Start Combat!' : 'Increment Turn'}
      </button>
      <button onClick={resetTurnWrapper}>Reset Turn</button>
    </div>
  );
};

export default CombatControlsContainer;
