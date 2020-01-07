import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementTurn, resetTurn } from '../../../actions/combatActions';

import { Paper, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  'controls-label': { overflowX: 'hidden' }
}));

const CombatControlsContainer = props => {
  const classes = useStyles();
  const activeBlock = useSelector(state => state.app.combat.activeBlock);
  const dispatch = useDispatch();

  const incrementTurnWrapper = useCallback(
    activeBlock => dispatch(incrementTurn(activeBlock)),
    [dispatch, activeBlock]
  );
  const resetTurnWrapper = useCallback(() => dispatch(resetTurn()), [dispatch]);

  return (
    <Paper variant={'outlined'} elevation={3}>
      <Typography
        variant={'h4'}
        align={'center'}
        className={classes['controls-label']}
      >
        Combat Controls
      </Typography>
      <button onClick={incrementTurnWrapper}>
        {activeBlock === '' ? 'Start Combat!' : 'Increment Turn'}
      </button>
      <button onClick={resetTurnWrapper}>Reset Turn</button>
      <div>Active Turn: {activeBlock} </div>
    </Paper>
  );
};

export default CombatControlsContainer;
