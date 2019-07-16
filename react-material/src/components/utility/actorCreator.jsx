//high level goals: refactor this where sub-components are defined elsewhere, and this layer allows generic "actorRow" to be abstracted and customized with params
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'relative'
  },
  fab: {
    margin: '10px'
  },
  upperRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paper: {
    // padding: theme.spacing(2),
    verticalAlign: 'middle',
    margin: '50px auto',
    position: 'relative',
    minHeight: '76px',
    width: '50%'

    // color: theme.palette.text.secondary
  },
  formControl: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row'
  },
  textField: {
    // marginLeft: '5px',
    // marginTop: '16px'
  },
  statField: {
    width: '60px',
    marginLeft: '20px'
  },
  initInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  initMod: {
    marginLeft: '3px',
    width: '60px',
    marginRight: '20px'
  },
  initIcon: {
    // color: 'dimgrey'
    color: 'black'
  },
  savesField: {
    width: '80px',
    marginLeft: '20px'
  },
  ACIcon: {
    color: 'black'
  }
}));

const saves = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

const ActorCreator = props => {
  const [values, setValues] = useState({
    editing: false,
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

  const handleSubmit = e => {
    e.preventDefault();
    props.cb(values, () =>
      setValues({
        editing: false,
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
      })
    );
  };

  const handleClick = e => {
    setValues({ ...values, editing: !values.editing });
  };

  const handleClickAway = () => {
    console.log('clicked away');
    setValues({ ...values, editing: !values.editing });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <span className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.upperRow}>
          <FormControl className={classes.formControl}>
            <TextField
              id={`name-${props.flavor}`}
              label="Name"
              className={classes.textField}
              value={values.name}
              onChange={handleChange('name')}
              margin="dense"
            />
            <div className={classes.initInput}>
              <Grid container spacing={1} alignItems="flex-end">
                {/* <Grid item>
                  <AddIcon fontSize="small" />
                </Grid> */}
                <Grid item>
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
              </Grid>
            </div>
            {/* <SvgIcon className={classes.ACIcon}> */}
            {/* <img
            src="https://image.flaticon.com/icons/svg/26/26631.svg"
            width="24px"
            height="24px"
          /> */}
            {/* </SvgIcon> */}
            <TextField
              id={`armorClass-${props.flavor}`}
              label="AC"
              className={classes.textField + ' ' + classes.statField}
              value={values.armorClass}
              onChange={handleChange('armorClass')}
              margin="dense"
              type="number"
            />
            <TextField
              id={`maxHP-${props.flavor}`}
              label="Max HP"
              className={classes.textField + ' ' + classes.statField}
              value={values.maxHP}
              onChange={handleChange('maxHP')}
              margin="dense"
              type="number"
            />
            {/* <ClickAwayListener> */}
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={handleClick}
            >
              {'Saves '}
              <EditIcon className={classes.rightIcon} />
            </Button>
            {/* </ClickAwayListener> */}
          </FormControl>
          <Fab
            color="primary"
            onClick={handleSubmit}
            className={classes.fab}
            label="Add"
          >
            <AddIcon />
          </Fab>
        </div>
        <Collapse in={values.editing}>
          <div>
            {saves.map((save, idx) => (
              <TextField
                id={`${save}-${props.flavor}`}
                key={idx}
                label={save.charAt(0).toUpperCase() + save.slice(1) + ' Save'}
                className={classes.savesField}
                value={values[`${save}Save`]}
                onChange={handleChange(`${save}Save`)}
                margin="dense"
                type="number"
              />
            ))}
          </div>
        </Collapse>
      </Paper>
    </span>
  );
};

export default ActorCreator;
