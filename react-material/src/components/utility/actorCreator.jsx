import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import RemoveIcon from '@material-ui/icons/Remove';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { maxWidth } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'relative'
  },
  fab: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  paper: {
    // padding: theme.spacing(2),
    verticalAlign: 'middle',
    margin: '50px auto',
    position: 'relative',
    minHeight: '76px',
    width: '100%'
    // color: theme.palette.text.secondary
  },
  textField: {
    marginLeft: '5px',
    marginTop: '16px'
  },
  statField: {
    width: '40px'
  }
}));

const ActorCreator = props => {
  const [values, setValues] = useState({
    editing: false,
    name: '',
    initMod: ''
  });
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleClick = e => {
    setValues({ ...values, editing: !values.editing });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const fabs = [
    {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />,
      label: 'Add'
    },
    {
      color: 'secondary',
      className: classes.fab,
      icon: <RemoveIcon />,
      label: 'Remove'
    }
  ];

  return (
    <span className={classes.root}>
      <Paper className={classes.paper}>
        <TextField
          id={`name-${props.flavor}`}
          label="Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin="dense"
        />
        <TextField
          id={`initMod-${props.flavor}`}
          label="+ Init"
          className={classes.textField + ' ' + classes.statField}
          value={values.initMod}
          onChange={handleChange('initMod')}
          margin="dense"
        />
        {fabs.map((fab, idx) => (
          <Zoom
            key={fab.color}
            in={
              (fab.label === 'Remove' && values.editing) ||
              (fab.label === 'Add' && !values.editing)
            }
            unmountOnExit
          >
            <Fab
              color={fab.color}
              onClick={handleClick}
              className={classes.fab}
            >
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
      </Paper>
    </span>
  );
};

export default ActorCreator;
