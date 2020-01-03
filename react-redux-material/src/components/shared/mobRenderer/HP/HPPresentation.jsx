import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  setCurrentHP,
  setMaxHP,
  healCurrentHP,
  damageCurrentHP
} from '../../../../actions/combatActions.js';

import { Typography, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: 'url("./resources/icons/heart.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '65px',
    height: '65px'
  },
  'display-base': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: '15px'
  },
  divider: {
    height: '2px',
    background: 'black',
    marginBottom: '1px'
  },
  text: {
    fontSize: '1.1rem',
    fontWeight: '420',
    lineHeight: '1rem',
    padding: '0px 3px'
  },
  'unknown-hp-text': {
    padding: '5px 3px 0px',
    fontWeight: '450',
    fontSize: '1.3rem',
    lineHeight: '1.2rem'
  },
  'hp-input-field': {
    padding: '5px 3px 0px',
    fontWeight: '450',
    fontSize: '1.3rem',
    lineHeight: '1.2rem',
    outline: 'none',
    border: 'none',
    background: 'transparent',
    width: '100%',
    display: 'inline-block'
  }
}));

const HPPresentation = props => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const handleHPEdit = useCallback(() => {
    let first = input[0];
    if (props.maxHP === '') {
      dispatch(setMaxHP(input, props.mobID));
    } else if (first === '-' || first === '+') {
      let value = parseInt(input.slice(1));
      if (first === '-') {
        dispatch(damageCurrentHP(value, props.mobID));
      } else {
        dispatch(healCurrentHP(value, props.mobID));
      }
    } else if (input === '') {
      handleDiscard();
    } else {
      dispatch(setCurrentHP(input, props.mobID));
    }
    setEditing(false);
    setInput('');
  }, [input, props.mobID]);

  const handleDiscard = () => {
    setEditing(false);
    setInput('');
  };

  return (
    <div className={classes.root} onClick={() => setEditing(true)}>
      <div className={classes['display-base']}>
        {editing ? (
          // <ClickAwayListener onClickAway={handleDiscard}>
          <input
            className={classes['hp-input-field']}
            type="text"
            placeholder={props.currentHP}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyUp={e => {
              if (e.keyCode === 13) {
                handleHPEdit();
              } else if (e.keyCode === 27) {
                handleDiscard();
              }
            }}
            // onBlur={handleDiscard}
            autoFocus
          />
        ) : // </ClickAwayListener>
        props.maxHP ? (
          <div>
            <Typography className={classes.text}>{props.currentHP}</Typography>
            <div className={classes.divider} />
            <Typography className={classes.text}>{props.maxHP}</Typography>
          </div>
        ) : (
          <Typography className={classes['unknown-hp-text']}> ? </Typography>
        )}
      </div>
    </div>
  );
};

export default HPPresentation;
