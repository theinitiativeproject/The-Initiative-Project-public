import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setCombatantName } from '../../../../actions/combatActions.js';

import { Typography, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  'mob-name': {
    width: '20vw',
    marginLeft: '5px'
  },
  'name-input': {
    width: '20vw',
    marginLeft: '3.5px',
    outline: 'none',
    border: 'none',
    display: 'block',
    'font-size': '1.25rem',
    'font-family': 'Roboto',
    'font-weight': '500',
    'line-height': '1.6',
    'letter-spacing': '0.0075em'
  }
}));

const Name = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(false);

  const handleDiscard = () => {
    setEditing(false);
    setInput('');
  };

  const handleSubmit = () => {
    let newName = input.charAt(0).toUpperCase() + input.slice(1);
    dispatch(setCombatantName(newName, props.mobID));
    setEditing(false);
    setInput('');
  };

  return (
    <>
      {editing ? (
        // <ClickAwayListener onClickAway={handleDiscard}>
        <input
          className={classes['name-input']}
          type="text"
          value={input}
          placeholder={props.name}
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
      ) : (
        // </ClickAwayListener>
        <Typography
          variant="h6"
          noWrap={true}
          display="block"
          className={classes['mob-name']}
          onClick={() => setEditing(true)}
        >
          {props.name}
        </Typography>
      )}
    </>
  );
};

export default Name;
