import React from 'react';
import { Grid } from '@material-ui/core';
import InitiativeBlockContainer from './initiativeBlock/initiativeBlockContainer.jsx';

const InitiativeListPresentation = props => {
  return (
    <Grid container direction="column" spacing={0}>
      {props.blockOrder.map((blockID, idx) => (
        <Grid item key={idx}>
          <InitiativeBlockContainer blockID={blockID} />
        </Grid>
      ))}
    </Grid>
  );
};

export default InitiativeListPresentation;
