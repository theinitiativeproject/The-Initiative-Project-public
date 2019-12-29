import {
  ADD_COMBATANT_BLOCK,
  INCREMENT_TURN,
  DELETE_COMBATANT_FROM_BLOCK,
  DELETE_LAST_COMBATANT_FROM_BLOCK,
  ADD_COMBATANT_TO_BLOCK,
  HEAL_CURRENT_HP,
  DAMAGE_CURRENT_HP,
  RESET_TURN
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
      // payload: { mob, initiative }

      let newMobID = uuidv4();
      let newMob = {
        ...action.payload.mob,
        currentHP: action.payload.mob.hp
      };
      newMob.name = newMob.name.charAt(0).toUpperCase() + newMob.name.slice(1);

      let newBlockID = uuidv4();
      let newBlock = {
        mobs: [newMobID],
        initiative: action.payload.initiative
      };

      let newBlockOrder = [...state.blockOrder];
      if (newBlockOrder.length === 0) {
        newBlockOrder.push(newBlockID);
      } else {
        for (let i = 0; i < newBlockOrder.length; i++) {
          let blockID = newBlockOrder[i];
          if (
            state.initiativeBlocks[blockID].initiative < newBlock.initiative
          ) {
            newBlockOrder.splice(i, 0, newBlockID);
            break;
          } else {
            if (i === newBlockOrder.length - 1) {
              newBlockOrder.push(newBlockID);
              break;
            }
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
      // payload: { mob, blockID }
      let newMob = { ...action.payload.mob, currentHP: action.payload.mob.hp };
      let newMobID = uuidv4();

      let newBlock = { ...state.initiativeBlocks[action.payload.blockID] };
      newBlock.mobs.push(newMobID);

      return {
        ...state,
        combatants: {
          ...state.combatants,
          [newMobID]: newMob
        },
        initiativeBlocks: {
          ...state.initiativeBlocks,
          [action.payload.blockID]: newBlock
        }
      };
    }

    case DELETE_COMBATANT_FROM_BLOCK: {
      // payload: { blockID, mobID }
      let { blockID, mobID } = action.payload;

      let newCombatants = { ...state.combatants };
      delete newCombatants[action.payload.mobID];

      let newBlockMobs = [...state.initiativeBlocks[blockID].mobs];
      newBlockMobs.splice(newBlockMobs.indexOf(mobID), 1);
      return {
        ...state,
        combatants: newCombatants,
        initiativeBlocks: {
          ...state.initiativeBlocks,
          [blockID]: { ...state.initiativeBlocks[blockID], mobs: newBlockMobs }
        }
      };
    }

    case DELETE_LAST_COMBATANT_FROM_BLOCK: {
      // payload: { blockID, mobID }
      let { blockID, mobID } = action.payload;
      let nextActiveBlock =
        state.blockOrder[
          (state.blockOrder.indexOf(blockID) + 1) % state.blockOrder.length
        ];
      if (state.blockOrder.length === 1 || state.activeBlock === '') {
        nextActiveBlock = '';
      }

      let newCombatants = { ...state.combatants };
      delete newCombatants[mobID];
      let newBlocks = { ...state.initiativeBlocks };
      delete newBlocks[blockID];
      let newOrder = [...state.blockOrder];
      newOrder.splice(newOrder.indexOf(blockID), 1);

      return {
        ...state,
        initiativeBlocks: newBlocks,
        blockOrder: newOrder,
        combatants: newCombatants,
        activeBlock: nextActiveBlock
      };
    }

    case HEAL_CURRENT_HP: {
      // payload: { healing, mobID }
      return {
        ...state,
        combatants: {
          ...state.combatants,
          [action.payload.mobID]: {
            ...state.combatants[action.payload.mobID],
            currentHP: Math.min(
              state.combatants[action.payload.mobID].hp,
              state.combatants[action.payload.mobID].currentHP +
                action.payload.healing
            )
          }
        }
      };
    }

    case DAMAGE_CURRENT_HP: {
      // payload: { damage, mobID }
      return {
        ...state,
        combatants: {
          ...state.combatants,
          [action.payload.mobID]: {
            ...state.combatants[action.payload.mobID],
            currentHP: Math.max(
              0,
              state.combatants[action.payload.mobID].currentHP -
                action.payload.damage
            )
          }
        }
      };
    }

    case INCREMENT_TURN: {
      // payload: { activeBlock }
      if (state.activeBlock === '') {
        return { ...state, activeBlock: state.blockOrder[0] || '' };
      }
      let nextActiveIdx =
        (state.blockOrder.indexOf(state.activeBlock) + 1) %
        state.blockOrder.length;
      return {
        ...state,
        activeBlock: state.blockOrder[nextActiveIdx]
      };
    }

    case RESET_TURN: {
      return {
        ...state,
        activeBlock: ''
      };
    }

    default:
      return state;
  }
}
