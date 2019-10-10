import {
  ADD_COMBATANT_BLOCK,
  INCREMENT_TURN,
  REMOVE_COMBATANT_FROM_BLOCK,
  ADD_COMBATANT_TO_BLOCK,
  APPLY_DAMAGE,
  APPLY_HEALING,
  MODIFY_CURRENT_HP
} from '../actions/types';

import uuidv4 from 'uuid/v4';

const initialState = {
  blockOrder: [],
  initiativeBlocks: {},
  combatants: {},
  activeBlock: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COMBATANT_BLOCK: {
      let newActiveBlock = state.activeBlock;

      let newBlockID = uuidv4();
      let newBlock = {
        mobs: [newMob.id],
        initiative: action.payload.initiative
      };

      let newMobID = uuidv4();
      let newMob = {
        ...action.payload.mob,
        currentHP: action.payload.mob.hp
      };

      let newBlockOrder = [...state.blockOrder];

      if (newBlockOrder.length === 0) {
        newBlockOrder.push(newBlockID);
        newActiveBlock = newBlockID;
      } else {
        for (let i = 0; i < newBlockOrder.length; i++) {
          let blockID = blockOrder[i];
          if (initiativeBlocks[blockID].initiative > newBlock.initiative) {
            newBlockOrder.splice(i, 0, newBlockID);
          } else {
            newBlockOrder.push(newBlockID);
          }
        }
      }

      return {
        ...state,
        combatants: { ...state.combatants, [newMobID]: newMob },
        initiativeBlocks: { ...state.initiativeBlocks, [newBlockID]: newBlock },
        blockOrder: newBlockOrder
      };
    }

    case ADD_COMBATANT_TO_BLOCK: {
      return {
        ...state,
        combantats: {
          ...state.combatants
        }
      };
    }

    case REMOVE_COMBATANT_FROM_BLOCK: {
    }

    case MODIFY_CURRENT_HP: {
    }

    case INCREMENT_TURN: {
      let newState = { ...state };
      newState.activeBlock =
        (newState.activeBlock + 1) % newState.initiativeBlocks.length || 0;
      return newState;
    }

    default:
      return state;
  }
}
