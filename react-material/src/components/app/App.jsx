import React from 'react';
import Mui from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ActorCreator from '../utility/actorCreator.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
    );
  }
}

export default App;
