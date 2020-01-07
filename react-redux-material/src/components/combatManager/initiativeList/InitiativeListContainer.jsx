import React from 'react';
import { useSelector } from 'react-redux';
import InitiativeBlockContainer from './initiativeBlock/initiativeBlockContainer.jsx';

// MUI imports
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  'initiative-list': { height: '100%', overflowY: 'scroll' },
  'initiative-block': { padding: '5px' },
  'even-initiative-block': { backgroundColor: '#f2f2f0' },
  'odd-initiative-block': { backgroundColor: '#bfbfbf' }
}));

const InitiativeListContainer = props => {
  const blockOrder = useSelector(state => state.app.combat.blockOrder);
  const classes = useStyles();

  return (
    <ol className={classes['initiative-list']}>
      {blockOrder.map((blockID, idx) => (
        <li
          key={idx}
          className={
            classes['initiative-block'] +
            ' ' +
            (idx % 2 === 0
              ? classes['even-initiative-block']
              : classes['odd-initiative-block'])
          }
        >
          <InitiativeBlockContainer blockID={blockID} />
        </li>
      ))}
    </ol>
  );
};

export default InitiativeListContainer;
