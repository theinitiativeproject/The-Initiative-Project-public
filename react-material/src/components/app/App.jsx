import React from 'react';
import Mui, { Grid, Typography, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Library from '../library/Library.jsx';

const theme = createMuiTheme();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homebrewMonsters: [
        {
          name: 'Aboleth',
          armorClass: 20,
          strSave: 1,
          dexSave: 2,
          conSave: 3,
          intSave: 4,
          wisSave: 5,
          chaSave: 6,
          initMod: 7,
          maxHP: 420,
          owner: 'charlie',
          id: '12345'
        },
        {
          name: 'Adult Blue Dragon',
          armorClass: 20,
          strSave: 1,
          dexSave: 2,
          conSave: 3,
          intSave: 4,
          wisSave: 5,
          chaSave: 6,
          initMod: 7,
          maxHP: 420,
          owner: 'charlie',
          id: '123456'
        },
        {
          name: 'Adult AWESOME Dragon',
          armorClass: 20,
          strSave: 1,
          dexSave: 2,
          conSave: 3,
          intSave: 4,
          wisSave: 5,
          chaSave: 6,
          initMod: 7,
          maxHP: 420,
          owner: 'charlie',
          id: '123457'
        }
      ]
    };

    this.editActor = this.editActor.bind(this);
  }

  editActor(id, newActor, cb) {
    let newHomebrews = this.state.homebrewMonsters.slice();
    newHomebrews[newHomebrews.findIndex(mob => mob.id === id)] = newActor;
    this.setState({ homebrewMonsters: newHomebrews }, cb);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Hello World
            </Button>
          </Grid>
          <Grid item>
            <Library
              homebrewMonsters={this.state.homebrewMonsters}
              editActor={this.editActor}
            />
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </ThemeProvider>
    );
  }
}

export default App;

{
  /* <Paper>
              <Grid item xs={2} container spacing={1}>
                {this.state.homebrewMonsters.map((mob, idx) => (
                  <Grid item xs={12} key={idx}>
                    <ActorItem actor={mob} editActor={this.editActor} />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <ActorCreator
                    flavor="player character"
                    role="creator"
                    cb={(vals, childBack) => {
                      console.log(vals);
                      childBack();
                    }}
                  />
                </Grid>
              </Grid>
            </Paper> */
}
