import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import InitiativeListControls from './initiativeListControls/initiativeListControls.jsx';
import InitiativeListBlockContainer from '../initiativeOrder/initiativeListBlock/initiativeListBlockContainer.jsx';
import InitiativeListAdder from './initiativeListAdder/initiativeListAdder.jsx';

const InitiativeListWrapper = props => {
  return (
    <div id="initiative-list-wrapper">
      <Grid container direction="column" justify="center" spacing={2}>
        <Grid item>
          <InitiativeListControls />
        </Grid>
        {props.initiativeBlocks.map((block, idx) => (
          <Grid item key={idx}>
            <InitiativeListBlockContainer
              block={block}
              blockIdx={idx}
              active={props.activeBlock === idx}
            />
          </Grid>
        ))}
        <Grid item>
          <InitiativeListAdder />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({ ...state.app.combat });

export default connect(mapStateToProps)(InitiativeListWrapper);
