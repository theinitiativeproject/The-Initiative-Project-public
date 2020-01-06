import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editBlockInitiative } from '../../../../actions/combatActions.js';

import MobRendererContainer from '../../../shared/mobRenderer/MobRendererContainer.jsx';

import { Paper, Typography, ClickAwayListener } from '@material-ui/core';
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
  },
  'initiative-input': {
    margin: '4px',
    outline: 'none',
    border: 'none',
    'font-size': '3rem',
    'font-family': 'Roboto',
    'font-weight': '400',
    'line-height': '1.04',
    'letter-spacing': '0em'
  }
}));

const InitiativeListBlockContainer = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(false);

  const handleDiscard = () => {
    setEditing(false);
    setInput('');
  };

  const handleSubmit = () => {
    let newInit = parseInt(input);
    if (!isNaN(newInit)) {
      dispatch(editBlockInitiative(props.blockID, newInit));
    }
    setEditing(false);
    setInput('');
  };

  const initiativeBlocks = useSelector(
    state => state.app.combat.initiativeBlocks
  );
  const activeBlock = useSelector(state => state.app.combat.activeBlock);

  let block = initiativeBlocks[props.blockID];

  const soloRef = useRef(null);
  useEffect(() => {
    if (props.blockID === activeBlock) {
      soloRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return () => {
      // cleanup
    };
  }, [props.blockID, activeBlock]);

  return (
    <div className={classes['initiative-block-container']} ref={soloRef}>
      {editing ? (
        <ClickAwayListener onClickAway={handleDiscard}>
          <input
            type="text"
            className={
              classes['initiative-display'] + ' ' + classes['initiative-input']
            }
            value={input}
            placeholder={block.initiative}
            onChange={e => setInput(e.target.value)}
            onBlur={handleDiscard}
            autoFocus
            onKeyUp={e => {
              if (e.keyCode === 13) {
                handleSubmit();
              } else if (e.keyCode === 27) {
                handleDiscard();
              }
            }}
          />
        </ClickAwayListener>
      ) : (
        <Typography
          onClick={() => setEditing(true)}
          className={
            classes['initiative-display'] +
            (props.blockID === activeBlock ? ' ' + classes['active-block'] : '')
          }
          variant="h3"
        >
          {block.initiative === -Infinity || block.initiative === null
            ? '?'
            : block.initiative}
        </Typography>
      )}

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
