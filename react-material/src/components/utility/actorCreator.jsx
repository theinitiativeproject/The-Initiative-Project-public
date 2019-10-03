//high level goals: refactor this where sub-components are defined elsewhere, and this layer allows generic "actorRow" to be abstracted and customized with params
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: '10px'
  },
  closeButton: { marginTop: '10px', marginRight: '10px' },
  paper: {
    // padding: theme.spacing(2),
    verticalAlign: 'middle',
    position: 'relative',
    minHeight: '76px'

    // color: theme.palette.text.secondary
  },
  leftSpacer: {
    marginLeft: '10px'
  },
  chaField: { marginRight: '10px' }
}));

const saves = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

const ActorCreator = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [values, setValues] = useState({
    expanded: false,
    name: '',
    initMod: '',
    armorClass: '',
    maxHP: '',
    strSave: '',
    dexSave: '',
    conSave: '',
    intSave: '',
    wisSave: '',
    chaSave: ''
  });
  const classes = useStyles();

  const disgardChanges = () => {
    setValues({
      expanded: false,
      name: '',
      initMod: '',
      armorClass: '',
      maxHP: '',
      strSave: '',
      dexSave: '',
      conSave: '',
      intSave: '',
      wisSave: '',
      chaSave: ''
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      initMod,
      armorClass,
      maxHP,
      strSave,
      dexSave,
      conSave,
      intSave,
      wisSave,
      chaSave
    } = values;

    if (name === '') {
      alert('Please enter a name for your creature');
    } else {
      let newActor = {
        name,
        initMod,
        armorClass,
        maxHP,
        strSave,
        dexSave,
        conSave,
        intSave,
        wisSave,
        chaSave
      };
      props.addActor(newActor, props.category, disgardChanges);
    }
  };

  const editToggle = e => {
    setValues({ ...values, expanded: !values.expanded });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const escKeyListener = e => {
    if (e.key === 'Escape') {
      props.closeCreator();
    }
  };

  useEffect(() => {
    // document.addEventListener('keypress', enterKeyListener);
    // document.addEventListener('keydown', escKeyListener);
    return () => {
      // document.removeEventListener('keypress', enterKeyListener);
      // document.removeEventListener('keydown', escKeyListener);
    };
  });

  const ref = React.useRef(null);

  // React.useEffect(() => {
  //   if (!ref.current || !ref.current.offsetWidth) return;
  //   console.log('do something with', ref.current.offsetWidth);
  // }, [ref.current]);

  return (
    <Paper className={classes.paper + ' ' + props.className} ref={ref}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                className={classes.leftSpacer}
                label="Name"
                value={values.name}
                onChange={handleChange('name')}
                margin="dense"
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="AC"
                value={values.armorClass}
                onChange={handleChange('armorClass')}
                margin="dense"
                type="number"
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="Max HP"
                value={values.maxHP}
                onChange={handleChange('maxHP')}
                margin="dense"
                type="number"
                className={classes.leftSpacer}
              />
            </Grid>
            <Grid item container xs={1} justify="flex-end">
              <Grid item>
                <IconButton
                  name="close"
                  size="small"
                  onClick={props.closeCreator}
                  className={classes.closeButton}
                >
                  <Close size="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs alignItems="center" justify="space-between">
            <Grid item xs={4}>
              <TextField
                className={classes.leftSpacer}
                name="initMod"
                label="Init Mod"
                onChange={handleChange('initMod')}
                value={values.initMod}
                margin="dense"
                type="number"
              />
            </Grid>
            <Grid item>
              <Button
                color="default"
                className={classes.modButton}
                onClick={editToggle}
              >
                {'Saves'}
              </Button>
            </Grid>
            <Grid item>
              <Fab
                color="primary"
                className={classes.fab}
                label="Add"
                type="submit"
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <Collapse in={values.expanded}>
              <Grid container>
                {saves.map((save, idx) => (
                  <Grid item key={idx} xs>
                    <TextField
                      className={
                        save === 'cha'
                          ? `${classes.leftSpacer} ${classes.chaField}`
                          : classes.leftSpacer
                      }
                      label={save.charAt(0).toUpperCase() + save.slice(1)}
                      value={values[`${save}Save`]}
                      onChange={handleChange(`${save}Save`)}
                      margin="dense"
                      type="number"
                    />
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ActorCreator;
