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
          <InitiativeListControls activeBlock={props.activeBlock} />
        </Grid>
        {props.blockOrder.map((blockID, idx) => (
          <Grid item key={idx}>
            <InitiativeListBlockContainer
              block={props.initiativeBlocks[blockID]}
              blockID={blockID}
              combatants={props.combatants}
              active={props.activeBlock === blockID}
            />
          </Grid>
        ))}
        <Grid item>
          <InitiativeListAdder blockOrder={props.blockOrder} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({ ...state.app.combat });

export default connect(mapStateToProps)(InitiativeListWrapper);
