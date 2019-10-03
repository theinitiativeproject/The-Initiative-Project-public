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
          name: 'Blue Dragon',
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
          name: 'COOL AWESOME Dragon',
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
    this.addActor = this.addActor.bind(this);
    this.removeActor = this.removeActor.bind(this);
  }

  editActor(id, newActor, category, cb) {
    let relevantMobs = this.state[category].slice();
    relevantMobs[relevantMobs.findIndex(mob => mob.id === id)] = newActor;
    this.setState({ [category]: relevantMobs }, cb);
  }

  addActor(newActor, category, cb) {
    let relevantMobs = this.state[category].slice();
    relevantMobs.push(newActor);
    relevantMobs.sort((a, b) => {
      let aName = a.name.slice().toUpperCase();
      let bName = b.name.slice().toUpperCase();
      return aName.localeCompare(bName, 'sort', { sensitivity: 'base' });
    });
    this.setState({ [category]: relevantMobs }, cb);
  }

  removeActor(id, category, cb) {
    let relevantMobs = this.state[category].slice();
    relevantMobs.splice(relevantMobs.findIndex(a => a.id === id), 1);
    this.setState({ [category]: relevantMobs }, cb);
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
              addActor={this.addActor}
              removeActor={this.removeActor}
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
