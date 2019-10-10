import {
  ADD_COMBATANT_BLOCK,
  ADD_COMBATANT_TO_BLOCK,
  INCREMENT_TURN,
  DELETE_COMBATANT_FROM_BLOCK,
  HEAL_CURRENT_HP,
  DAMAGE_CURRENT_HP,
  RESET_TURN,
  DELETE_LAST_COMBATANT_FROM_BLOCK
} from './types';

export const addCombatantBlock = (mob, initiative) => dispatch => {
  dispatch({ type: ADD_COMBATANT_BLOCK, payload: { mob, initiative } });
};

export const addCombatantToBlock = (mob, blockID) => dispatch => {
  dispatch({ type: ADD_COMBATANT_TO_BLOCK, payload: { mob, blockID } });
};

export const incrementTurn = activeBlock => dispatch => {
  dispatch({ type: INCREMENT_TURN, payload: { activeBlock } });
};

export const deleteCombatantFromBlock = (blockID, mobID) => dispatch => {
  dispatch({
    type: DELETE_COMBATANT_FROM_BLOCK,
    payload: { blockID, mobID }
  });
};

export const deleteLastCombatantFromBlock = (blockID, mobID) => dispatch => {
  dispatch({
    type: DELETE_LAST_COMBATANT_FROM_BLOCK,
    payload: { blockID, mobID }
  });
};

export const healCurrentHP = (healing, mobID) => dispatch => {
  dispatch({
    type: HEAL_CURRENT_HP,
    payload: { healing, mobID }
  });
};

export const damageCurrentHP = (damage, mobID) => dispatch => {
  dispatch({
    type: DAMAGE_CURRENT_HP,
    payload: { damage, mobID }
  });
};

export const resetTurn = () => dispatch => {
  dispatch({ type: RESET_TURN });
};
