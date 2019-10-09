import { combineReducers } from 'redux';
import combatReducer from './combatReducer';

export default combineReducers({
  app: combineReducers({ combat: combatReducer })
});
