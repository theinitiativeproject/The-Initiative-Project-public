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
import InitiativeListWrapper from '../initiativeOrder/initiativeListWrapper.jsx';

function App() {
  return (
    <Provider store={store}>
      <InitiativeListWrapper />
    </Provider>
  );
}

export default App;
