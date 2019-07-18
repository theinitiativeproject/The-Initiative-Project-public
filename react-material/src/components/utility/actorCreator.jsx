//high level goals: refactor this where sub-components are defined elsewhere, and this layer allows generic "actorRow" to be abstracted and customized with params
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import RemoveIcon from '@material-ui/icons/Remove';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { maxWidth } from '@material-ui/system';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import SvgIcon from '@material-ui/core/SvgIcon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'relative'
  },
  fab: {
    margin: '10px'
  },
  paper: {
    // padding: theme.spacing(2),
    verticalAlign: 'middle',
    margin: '50px auto',
    position: 'relative',
    minHeight: '76px'
    // width: '50%'

    // color: theme.palette.text.secondary
  },
  statField: {
    width: '60px'
    // marginLeft: '20px'
  },
  initInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  savesField: {
    width: '30px',
    marginLeft: '20px'
  },
  ACIcon: {
    color: 'black'
  }
}));

const saves = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

const ActorCreator = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [values, setValues] = useState({
    editing: false,
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
    chaSave: '',
    creator: true
  });
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    props.cb(values, () =>
      setValues({
        editing: false,
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
        chaSave: '',
        creator: values.creator
      })
    );
  };

  const editToggle = e => {
    setValues({ ...values, editing: !values.editing });
  };

  const expandToggle = e => {
    setValues({ ...values, expanded: !values.expanded, editing: false });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const refTest = React.useRef(null);

  React.useEffect(() => {
    if (!refTest.current || !refTest.current.offsetWidth) return;
    console.log('do something with', refTest.current.offsetWidth);
  }, [refTest.current]);

  return (
    <span className={classes.root}>
      <Paper className={classes.paper} ref={refTest}>
        <Grid container spacing={0} alignItems="center" justify="space-between">
          <Grid
            container
            item
            xs={12}
            sm={8}
            spacing={3}
            justify={matches ? 'space-between' : 'flex-start'}
          >
            <Grid item xs={3}>
              <TextField
                id={`name-${props.flavor}`}
                label="Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="dense"
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id={`armorClass-${props.flavor}`}
                label="AC"
                className={classes.textField + ' ' + classes.statField}
                value={values.armorClass}
                onChange={handleChange('armorClass')}
                margin="dense"
                type="number"
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id={`maxHP-${props.flavor}`}
                label="Max HP"
                className={classes.textField + ' ' + classes.statField}
                value={values.maxHP}
                onChange={handleChange('maxHP')}
                margin="dense"
                type="number"
              />
            </Grid>
          </Grid>
          <Grid
            container
            justify={matches ? 'flex-end' : 'space-between'}
            spacing={matches ? 3 : 0}
            item
            xs={12}
            sm={4}
            alignItems="center"
          >
            <Grid item>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={editToggle}
              >
                <EditIcon className={classes.rightIcon} />
                {' Modifiers'}
              </Button>
            </Grid>
            <Grid item>
              <Fab
                color="primary"
                onClick={handleSubmit}
                className={classes.fab}
                label="Add"
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Collapse in={values.editing}>
              <Grid container spacing={5} justify="flex-start">
                <Grid item xs={3}>
                  <TextField
                    className={classes.initMod}
                    id={`initMod-${props.flavor}`}
                    label="Init Mod"
                    onChange={handleChange('initMod')}
                    value={values.initMod}
                    margin="dense"
                    type="number"
                  />
                </Grid>
                {saves.map((save, idx) => (
                  <Grid item xs={1} key={idx}>
                    <TextField
                      id={`${save}-${props.flavor}`}
                      label={save.charAt(0).toUpperCase() + save.slice(1)}
                      className={classes.savesField}
                      value={values[`${save}Save`]}
                      disabled
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
      </Paper>
      <div>{'matches: ' + matches}</div>
      <div>{refTest.current !== null ? refTest.current.offsetWidth : ':('}</div>
    </span>
  );
};

export default ActorCreator;
