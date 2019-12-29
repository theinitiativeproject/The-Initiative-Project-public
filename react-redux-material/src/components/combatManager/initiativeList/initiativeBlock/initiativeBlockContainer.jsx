import React from 'react';
import { useSelector } from 'react-redux';

import MobRendererContainer from '../../../shared/mobRenderer/MobRendererContainer.jsx';

import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  'initiative-display': { margin: '5px', width: '55px', textAlign: 'center' },
  'active-block': {
    background: 'green'
  },
  'initiative-block-container': {
    display: 'flex',
    alignItems: 'center'
  },
  'initiative-mobs-container': {
    flex: '1 1 auto'
  }
}));

const InitiativeListBlockContainer = props => {
  const classes = useStyles();

  const initiativeBlocks = useSelector(
    state => state.app.combat.initiativeBlocks
  );
  const activeBlock = useSelector(state => state.app.combat.activeBlock);

  let block = initiativeBlocks[props.blockID];

  return (
    <div className={classes['initiative-block-container']}>
      <Typography
        className={
          classes['initiative-display'] +
          ' ' +
          (props.blockID === activeBlock ? classes['active-block'] : '')
        }
        variant="h3"
      >
        {block.initiative === -Infinity ? '?' : block.initiative}
      </Typography>
      <div className={classes['initiative-mobs-container']}>
        {block.mobs.map((mobID, idxInBlock) => (
          <Paper key={idxInBlock}>
            <MobRendererContainer
              blockID={props.blockID}
              mobID={mobID}
              solo={block.mobs.length === 1}
            />
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default InitiativeListBlockContainer;
