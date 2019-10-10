import {
  ADD_COMBATANT_BLOCK,
  ADD_COMBATANT_TO_BLOCK,
  INCREMENT_TURN,
  REMOVE_COMBATANT_FROM_BLOCK,
  MODIFY_CURRENT_HP
} from './types';

export const addCombatantBlock = (mob, initiative) => dispatch => {
  dispatch({ type: ADD_COMBATANT_BLOCK, payload: { mob, initiative } });
};

export const addCombatantToBlock = (mob, targetBlock) => dispatch => {
  dispatch({ type: ADD_COMBATANT_TO_BLOCK, payload: { mob, targetBlock } });
};

export const incrementTurn = () => dispatch => {
  dispatch({ type: INCREMENT_TURN });
};

export const removeCombatantFromBlock = (blockIdx, mobIdx) => dispatch => {
  dispatch({
    type: REMOVE_COMBATANT_FROM_BLOCK,
    payload: { blockIdx, mobIdx }
  });
};

export const modifyCurrentHP = (hpDelta, blockIdx, mobIdx) => dispatch => {
  dispatch({ type: MODIFY_CURRENT_HP, payload: { hpDelta, blockIdx, mobIdx } });
};
