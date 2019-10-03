import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getThemeProps } from '@material-ui/styles';
import { Paper, Typography, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditOutlineIcon from '@material-ui/icons/EditOutlined';
import Popover from '@material-ui/core/Popover';

import ActorEditor from './actorEditor.jsx';
import { height } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(1)
  },
  button: {
    // padding: theme.spacing(1)
    // width: '80%'
  },
  buttonText: {
    justifyContent: 'left'
  },
  editIcon: { visibility: 'hidden' },
  activeCard: {
    visibility: 'visible',
    marginRight: '10px'
  },
  popover: {
    width: '42vw'
    // height: '245px'
  }
}));

const ActorItem = props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = useState({
    hovered: false
  });

  const open = Boolean(anchorEl);

  const handlePaperEnter = e => {
    setValues({ ...values, hovered: true });
  };

  const handlePaperLeave = e => {
    setValues({ ...values, hovered: false });
  };

  const handleClick = e => {
    setAnchorEl(ref.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ref = React.useRef(null);

  return (
    <Paper
      className={classes.root}
      onMouseOver={handlePaperEnter}
      onMouseLeave={handlePaperLeave}
      ref={ref}
    >
      <Grid container justify="space-between">
        <Grid item xs>
          <Button
            className={classes.button}
            color="default"
            size="small"
            variant="text"
            classes={{ label: classes.buttonText }}
            fullWidth={true}
          >
            {props.actor.name}
          </Button>
          <Popover
            open={open}
            classes={{
              paper: classes.popover
            }}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
          >
            <ActorEditor
              editActor={props.editActor}
              removeActor={props.removeActor}
              actor={props.actor}
              handleClose={handleClose}
              handlePaperLeave={handlePaperLeave}
              category={props.category}
            />
          </Popover>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            className={values.hovered ? classes.activeCard : classes.editIcon}
            onClick={handleClick}
          >
            <EditOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ActorItem;
