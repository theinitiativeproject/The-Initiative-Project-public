import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, IconButton, Button } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import DeleteForever from '@material-ui/icons/DeleteForever';

const hidden = ['owner', 'id'];

const useStyles = makeStyles(theme => ({
  closeButton: {
    marginTop: '10px',
    marginRight: '10px',
    marginBottom: '45px'
  },
  spacer: { marginLeft: '10px' },
  initMod: { marginLeft: '-9px' },
  deleteButton: {
    margin: '10px'
  }
}));

const ActorEditor = props => {
  const classes = useStyles();
  const [values, setValues] = useState(props.actor);

  const enterKeyListener = e => {
    if (e.keyCode === 13) {
      handleBlur(e, props.handleClose);
    }
  };
  useEffect(() => {
    document.addEventListener('keypress', enterKeyListener);
    return () => {
      document.removeEventListener('keypress', enterKeyListener);
    };
  });

  const handleChange = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleBlur = (e, cb) => {
    // if for some reason i don't want to trigger blur when hitting top right 'X'
    // if (e.relatedTarget.name !== 'close') {
    //   props.editActor(values.id, values);
    // }
    props.editActor(values.id, values, cb);
    props.handlePaperLeave();
  };

  let saves = [
    'strSave',
    'dexSave',
    'conSave',
    'intSave',
    'wisSave',
    'chaSave'
  ];

  return (
    <Grid container>
      <Grid item container xs={12} alignItems="flex-end">
        <Grid item xs={4}>
          <TextField
            className={classes.spacer}
            margin="dense"
            label={'Name'}
            value={values.name}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs>
          <TextField
            className={classes.initMod}
            margin="dense"
            label={'Init Mod'}
            value={values.initMod}
            name="initMod"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs>
          <TextField
            margin="dense"
            label={'Armor Class'}
            value={values.armorClass}
            name="armorClass"
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.spacer}
          />
        </Grid>
        <Grid item xs>
          <TextField
            margin="dense"
            label={'Max HP'}
            value={values.maxHP}
            name="maxHP"
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.spacer}
          />
        </Grid>
        <Grid item xs={1} container justify="flex-end" alignItems="flex-start">
          <Grid item>
            <IconButton
              name="close"
              size="small"
              onClick={props.handleClose}
              className={classes.closeButton}
            >
              <Close size="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        {saves.map((save, idx) => {
          return (
            <Grid item xs key={idx}>
              <TextField
                margin="dense"
                label={
                  save.charAt(0).toUpperCase() +
                  save.slice(1, 3) +
                  ' ' +
                  save.slice(3)
                }
                className={classes.spacer}
                value={values[save]}
                name={save}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
          );
        })}
        <Grid item xs={1} />
      </Grid>
      <Grid item container xs={12} justify="flex-end">
        <Button
          className={classes.deleteButton}
          variant="contained"
          color="secondary"
          onClick={() => {
            let confirm = window.confirm(`Delete ${props.actor.name}?`);
            confirm ? console.log('deleted') : console.log('not deleted');
          }}
        >
          <DeleteForever />
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActorEditor;
