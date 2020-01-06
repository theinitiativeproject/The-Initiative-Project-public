import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setCombatantAC } from '../../../../actions/combatActions.js';

import { Typography, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: 'url("./resources/icons/armor.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '65px',
    height: '65px'
  },
  gridBase: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '15px'
  },
  ac: {
    fontWeight: '450',
    fontSize: '1.3rem',
    lineHeight: '1.2rem'
  },
  subtitle: {
    paddingTop: '2px'
  },
  'ac-input': {
    outline: 'none',
    textAlign: 'center',
    width: '100%',
    border: 'none',
    background: 'transparent'
  }
}));

const ACPresentation = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(false);

  const handleDiscard = () => {
    setEditing(false);
    setInput('');
  };

  const handleSubmit = () => {
    let newAC = parseInt(input);
    if (!isNaN(newAC)) {
      dispatch(setCombatantAC(input, props.mobID));
    }
    setEditing(false);
    setInput('');
  };

  return (
    <div className={classes.root}>
      <div className={classes.gridBase} onClick={() => setEditing(true)}>
        {editing ? (
          <ClickAwayListener onClickAway={handleDiscard}>
            <input
              className={classes.ac + ' ' + classes['ac-input']}
              type="text"
              value={input}
              placeholder={props.ac}
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
          <>
            <Typography className={classes.ac}>
              {props.ac ? props.ac : '?'}
            </Typography>
            <Typography variant="caption" className={classes.subtitle}>
              AC
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default ACPresentation;
