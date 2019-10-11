import React from 'react';

// import { ThemeProvider } from '@material-ui/styles';
// import { createMuiTheme } from '@material-ui/core/styles';
// import Mui, { Grid, Typography, Paper } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// const theme = createMuiTheme();

// redux imports
import { Provider } from 'react-redux';
import store from '../../store';

// component imports
import CombatManagerContainer from '../combatManager/CombatManagerContainer.jsx';

function App() {
  return (
    <Provider store={store}>
      <CombatManagerContainer />
    </Provider>
  );
}

export default App;
