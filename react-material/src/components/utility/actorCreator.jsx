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
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import SvgIcon from '@material-ui/core/SvgIcon';

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
    minHeight: '76px',
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  }
}));

const ActorCreator = props => {
  const [values, setValues] = useState({
    editing: false,
    name: '',
    initMod: '',
    armorClass: '',
    maxHP: ''
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
        <FormControl className={classes.formControl}>
          <TextField
            id={`name-${props.flavor}`}
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin="dense"
          />
          <div>d20 icon</div>
          <div className={classes.initInput}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AddIcon fontSize="small" />
              </Grid>
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
          <SvgIcon>
            <path href="https://image.flaticon.com/icons/svg/26/26631.svg" />
          </SvgIcon>
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
        </FormControl>
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
