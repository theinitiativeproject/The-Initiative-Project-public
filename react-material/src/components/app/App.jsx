import React from 'react';
import Mui from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ActorCreator from '../utility/actorCreator.jsx';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Button variant="contained" color="primary">
            Hello World
          </Button>
          <ActorCreator
            flavor="player character"
            cb={(vals, childBack) => {
              console.log(vals);
              childBack();
            }}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
