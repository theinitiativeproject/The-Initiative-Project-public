import {
  ADD_COMBATANT_BLOCK,
  INCREMENT_TURN,
  REMOVE_COMBATANT_FROM_BLOCK,
  ADD_COMBATANT_TO_BLOCK,
  APPLY_DAMAGE,
  APPLY_HEALING,
  MODIFY_CURRENT_HP
} from '../actions/types';

import uuid from 'uuid';

const initialState = {
  initiativeBlocks: [],
  combatants: {},
  activeBlock: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COMBATANT_BLOCK: {
      let blockToInsert = {
        init: action.payload.init,
        mobs: [{ ...action.payload.mob, currentHP: action.payload.mob.hp }]
      };
      let blocksCopy = state.initiativeBlocks.slice();
      if (blocksCopy.length === 0) {
        blocksCopy.push(blockToInsert);
      } else {
        if (blockToInsert.init === -Infinity) {
          blocksCopy.push(blockToInsert);
        } else {
          for (let i = 0; i < blocksCopy.length; i++) {
            if (blockToInsert.init > blocksCopy[i].init) {
              blocksCopy.splice(i, 0, blockToInsert);
              break;
            } else if (i === blocksCopy.length - 1) {
              blocksCopy.push(blockToInsert);
              break;
            }
          }
        }
      }
      return { initiativeBlocks: blocksCopy, activeBlock: state.activeBlock };
    }

    case ADD_COMBATANT_TO_BLOCK: {
      let copy = state.initiativeBlocks.slice();
      let mob = { ...action.payload.mob, currentHP: action.payload.mob.hp };

      copy[action.payload.targetBlock].mobs.push(mob);
      return { initiativeBlocks: copy, activeBlock: state.activeBlock };
    }

    case REMOVE_COMBATANT_FROM_BLOCK: {
      console.log(state);
      console.log(action.payload);
      let blockIdx = action.payload.blockIdx;
      let mobIdx = action.payload.mobIdx;
      let copy = state.initiativeBlocks.slice();
      console.log(copy);
      let activeBlockCopy = state.activeBlock;
      copy[blockIdx].mobs.splice(mobIdx, 1);
      if (copy[blockIdx].mobs.length === 0) {
        copy.splice(blockIdx, 1);
        if (state.activeBlock >= blockIdx) activeBlockCopy--;
      }
      return { initiativeBlocks: copy, activeBlock: activeBlockCopy };
    }

    case MODIFY_CURRENT_HP: {
      let blockIdx = action.payload.blockIdx;
      let mobIdx = action.payload.mobIdx;
      let healing = action.payload.hpDelta >= 0;
      let copy = state.initiativeBlocks.slice();
      console.log(copy[blockIdx] === state.initiativeBlocks[blockIdx]);
      let mob = copy[blockIdx].mobs[mobIdx];
      mob.currentHP = healing
        ? Math.min(mob.hp, (mob.currentHP += action.payload.hpDelta))
        : Math.max(0, (mob.currentHP += action.payload.hpDelta));
      return { initiativeBlocks: copy, activeBlock: state.activeBlock };
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
