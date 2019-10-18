import React from 'react';
import { connect } from 'react-redux';
import {
  healCurrentHP,
  damageCurrentHP
} from '../../../../../actions/combatActions.js';

import HPEditorPresentation from './HPEditorPresentation.jsx';

const HPEditorContainer = props => {
  return <HPEditorPresentation {...props} />;
};

export default connect(
  null,
  { healCurrentHP, damageCurrentHP }
)(HPEditorContainer);
