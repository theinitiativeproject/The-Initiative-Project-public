import React from 'react';
import ReactDOM from 'react-dom';
import Encounter from './components/Encounter/Encounter.jsx';
import Library from './components/Library/Library.jsx';
import PartyMembers from './components/PartyMembers/PartyMembers.jsx';
import SavedEncounters from './components/Encounter/SavedEncounters/SavedEncounters.jsx';
import RollInitiative from './components/Utilities/RollInitiative/RollInitiative.jsx';
import './index.css';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAGahwK6t-je1eiqnBQO830RoXqRAXUgYc',
  authDomain: 'theinitiativeproject-eaec3.firebaseapp.com',
  databaseURL: 'https://theinitiativeproject-eaec3.firebaseio.com',
  projectId: 'theinitiativeproject-eaec3',
  storageBucket: 'theinitiativeproject-eaec3.appspot.com',
  messagingSenderId: '292781873005',
  appId: '1:292781873005:web:7d50d488cb69e930'
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

var images = [
  'background1.jpg',
  'background2.jpg',
  'background3.jpg',
  'background4.jpg',
  'background5.jpg',
  'background6.jpg',
  'background7.jpg'
];
var currImg = images[Math.floor(Math.random() * images.length)];

// a little function to help us with reordering the result
const reorder = (actors, startIndex, endIndex) => {
  const result = Array.from(actors);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: undefined,
      rollInitiativeToggle: true,
      currentTab: 'srd',
      srdMonsters: [],
      homebrewMonsters: [],
      partyMembers: [],
      encounters: [
        {
          actors: [],
          activePosition: 0,
          numTurns: 0,
          owner: ''
        }
      ],
      activeEncounter: 0,
      hbAC: '',
      hbChaSave: '',
      hbConSave: '',
      hbDexSave: '',
      hbMaxHP: '',
      hbInitMod: '',
      hbIntSave: '',
      hbName: '',
      hbStrSave: '',
      hbWisSave: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.retrieveSRDMonsters = this.retrieveSRDMonsters.bind(this);
    this.retrieveHomebrewMonsters = this.retrieveHomebrewMonsters.bind(this);
    this.retrieveEncounters = this.retrieveEncounters.bind(this);
    this.rollInitiativeToggle = this.rollInitiativeToggle.bind(this);
    this.addActorToEncounter = this.addActorToEncounter.bind(this);
    this.editActorFromEncounter = this.editActorFromEncounter.bind(this);
    this.deleteActorFromEncounter = this.deleteActorFromEncounter.bind(this);
    this.healActor = this.healActor.bind(this);
    this.damageActor = this.damageActor.bind(this);
    this.addToPartyMembers = this.addToPartyMembers.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.firestoreAddHomebrewMonster = this.firestoreAddHomebrewMonster.bind(
      this
    );
    this.switchTurn = this.switchTurn.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.sort = this.sort.bind(this);
    this.saveEncounter = this.saveEncounter.bind(this);
    this.changeActiveEncounter = this.changeActiveEncounter.bind(this);
    this.createNewEncounter = this.createNewEncounter.bind(this);
  }

  componentDidMount() {
    this.retrieveSRDMonsters();
    auth.onAuthStateChanged(userTemp => {
      if (userTemp) {
        this.setState({ user: userTemp }, () => {
          this.retrieveHomebrewMonsters(userTemp.uid);
          this.retrievePartyMembers(userTemp.uid);
          this.retrieveEncounters(userTemp.uid);
        });
      } else {
        console.log('not logged in');
        this.setState({
          homebrewMonsters: [],
          partyMembers: [],
          encounters: [
            {
              actors: [],
              activePosition: 0,
              numTurns: 0,
              owner: '',
              encounterName: 'Main Encounter'
            }
          ]
        });
      }
    });
  }

  firestoreAddHomebrewMonster(monster, uid = null) {
    if (!uid) {
      alert('can not save monster while not logged in');
    } else {
      monster.owner = uid;
      db.collection('homebrew_monsters')
        .add(monster)
        .then(() => console.log('monster added successfully'))
        .then(() => {
          this.setState({
            hbAC: '',
            hbChaSave: '',
            hbConSave: '',
            hbDexSave: '',
            hbMaxHP: '',
            hbInitMod: '',
            hbIntSave: '',
            hbName: '',
            hbStrSave: '',
            hbWisSave: ''
          });
        })
        .then(() => {
          let hbMonsters = this.state.homebrewMonsters.slice();
          hbMonsters.push(monster);
          this.setState({ homebrewMonsters: hbMonsters });
        })
        .catch(err => console.log(err));
    }
  }

  retrieveEncounters(uid) {
    db.collection('encounters')
      .where('owner', '==', uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('no user owned encounters in database');
          return [
            {
              actors: [],
              activePosition: 0,
              numTurns: 0,
              owner: this.state.user.uid,
              encounterName: 'Main Encounter'
            }
          ];
        }
        let resultsArr = [];
        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;
          resultsArr.push(data);
        });
        return resultsArr;
      })
      .then(resultsArr => this.setState({ encounters: resultsArr }))
      .catch(err => console.log('error retrieving encounters', err));
  }

  retrievePartyMembers(uid) {
    db.collection('party_members')
      .where('owner', '==', uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('no user owned party members in database');
          return [];
        }
        let resultsArr = [];
        snapshot.forEach(doc => {
          let data = doc.data();
          resultsArr.push(data);
        });
        return resultsArr;
      })
      .then(resultsArr => this.setState({ partyMembers: resultsArr }))
      .catch(err => console.log('error retrieving party members', err));
  }

  retrieveHomebrewMonsters(uid) {
    db.collection('homebrew_monsters')
      .where('owner', '==', uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('no user owned monsters in homebrew database');
          return [];
        }
        let resultsArr = [];
        snapshot.forEach(doc => {
          let data = doc.data();
          resultsArr.push(data);
        });
        return resultsArr;
      })
      .then(resultsArr => this.setState({ homebrewMonsters: resultsArr }))
      .catch(err => console.log('error retrieving homebrew monsters', err));
  }

  retrieveSRDMonsters() {
    db.collection('srd_monsters_bulk')
      .doc('ef0QmjoiFkM9qdwdiiL5')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('no monsters in SRD database');
          return;
        }
        let resultsArr = snapshot.data().monsters;
        return resultsArr;
      })
      .then(resultsArr => {
        this.setState({ srdMonsters: resultsArr });
      })
      .catch(err => console.log('error retrieving SRD monsters', err));
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleLogIn() {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() =>
        this.setState({
          email: '',
          password: ''
        })
      )
      .catch(err => console.log(err));
  }

  handleLogOut() {
    auth.signOut().then(() => {
      this.setState({
        email: '',
        password: '',
        user: undefined
      });
    });
  }

  handleSignUp() {
    // TODO: validate real email
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          email: '',
          password: ''
        });
      })
      .catch(err => {
        alert(err.message);
      });
  }

  rollInitiativeToggle() {
    this.setState({
      rollInitiativeToggle: !this.state.rollInitiativeToggle
    });
  }

  addActorToEncounter(actor, isActorCard = false) {
    actor.currentHP = actor.maxHP;
    if (this.state.rollInitiativeToggle && isActorCard) {
      actor.initiative = Math.floor(Math.random() * 20 + 1) + actor.initMod;
    }
    let tempEncounters = this.state.encounters.slice();
    tempEncounters[this.state.activeEncounter].actors.push(actor);
    this.setState({
      encounters: tempEncounters
    });
  }

  editActorFromEncounter(e, index, character) {
    e.preventDefault();
    let tempEncounters = this.state.encounters;
    tempEncounters[this.state.activeEncounter].actors[index]['chaSave'] =
      character.charChaSave;
    tempEncounters[this.state.activeEncounter].actors[index]['conSave'] =
      character.charConSave;
    tempEncounters[this.state.activeEncounter].actors[index]['dexSave'] =
      character.charDexSave;
    tempEncounters[this.state.activeEncounter].actors[index]['initMod'] =
      character.charInitMod;
    tempEncounters[this.state.activeEncounter].actors[index]['intSave'] =
      character.charIntSave;
    tempEncounters[this.state.activeEncounter].actors[index]['strSave'] =
      character.charStrSave;
    tempEncounters[this.state.activeEncounter].actors[index]['wisSave'] =
      character.charWisSave;
    this.setState({
      encounters: tempEncounters
    });
  }

  deleteActorFromEncounter(index) {
    let tempEncounters = this.state.encounters;
    tempEncounters[this.state.activeEncounter].actors.splice(index, 1);
    this.setState({
      encounters: tempEncounters
    });
  }

  healActor(index, value) {
    if (value > 0) {
      let encounters = this.state.encounters;
      if (
        encounters[this.state.activeEncounter].actors[index].currentHP +
          value >=
        encounters[this.state.activeEncounter].actors[index].maxHP
      ) {
        encounters[this.state.activeEncounter].actors[index].currentHP =
          encounters[this.state.activeEncounter].actors[index].maxHP;
      } else {
        encounters[this.state.activeEncounter].actors[index].currentHP += value;
      }
      this.setState({ encounters });
    }
  }

  damageActor(index, value) {
    if (value > 0) {
      let encounters = this.state.encounters;
      if (
        encounters[this.state.activeEncounter].actors[index].currentHP -
          value <=
        0
      ) {
        encounters[this.state.activeEncounter].actors[index].currentHP = 0;
      } else {
        encounters[this.state.activeEncounter].actors[index].currentHP -= value;
      }
      this.setState({ encounters });
    }
  }

  addToPartyMembers(obj) {
    let temp = this.state.partyMembers.slice();
    if (this.state.user) {
      obj.owner = this.state.user.uid;
      db.collection('party_members')
        .add(obj)
        .then(() => {
          console.log('Added to Party Members');
        })
        .then(() => {
          temp.push(obj);
          this.setState({ partyMembers: temp });
        })
        .catch(err =>
          console.log('error adding character to Party Members', err)
        );
    } else {
      temp.push(obj);
      this.setState({ partyMembers: temp });
    }
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const characters = reorder(
      this.state.encounters[this.state.activeEncounter].actors,
      result.source.index,
      result.destination.index
    );

    let temp = this.state.encounters.slice();
    temp[this.state.activeEncounter].actors = characters;
    this.setState({
      encounters: temp
    });
  }

  switchTurn() {
    let temp = this.state.encounters.slice();
    temp[this.state.activeEncounter].activePosition++;
    if (
      temp[this.state.activeEncounter].activePosition ===
      temp[this.state.activeEncounter].actors.length
    ) {
      temp[this.state.activeEncounter].activePosition = 0;
    }

    this.setState({
      encounters: temp
    });
  }

  switchTab(newTab) {
    this.setState({
      currentTab: newTab
    });
  }

  sort() {
    let temp = this.state.encounters[this.state.activeEncounter].actors.slice();
    temp.sort((a, b) => {
      if (
        typeof a.initiative === 'number' &&
        typeof b.initiative === 'number'
      ) {
        return b.initiative - a.initiative;
      } else if (typeof a.initiative === 'number') {
        return -1;
      } else if (typeof b.initiative === 'number') {
        return 1;
      } else {
        return 0;
      }
    });

    let tempEncounters = this.state.encounters.slice();
    tempEncounters[this.state.activeEncounter].actors = temp;
    this.setState({
      encounters: tempEncounters
    });
  }

  saveEncounter() {
    if (!this.state.user) {
      alert('You must be signed in to save an encounter to the server');
      return;
    }
    let temp = this.state.encounters[this.state.activeEncounter];
    if (temp.id) {
      let docID = temp.id;
      delete temp.id;
      return db
        .collection('encounters')
        .doc(docID)
        .set(temp)
        .catch(err => console.log('error saving encounter', err));
    } else {
      return db.collection('encounters').add(temp);
    }
  }

  changeActiveEncounter(idx) {
    this.setState({
      activeEncounter: idx
    });
  }

  createNewEncounter() {
    if (this.state.user) {
      this.saveEncounter().then(() => {
        let newEncounterName = prompt(
          'Please enter a name for your new encounter'
        );
        if (newEncounterName !== null) {
          let temp = {
            actors: [],
            activePosition: 0,
            numTurns: 0,
            owner: this.state.user.uid,
            encounterName: newEncounterName
          };
          this.state.encounters.push(temp);
          this.changeActiveEncounter(this.state.encounters.length - 1);
        }
      });
    } else {
      let newEncounterName = prompt(
        'Please enter a name for your new encounter'
      );
      if (newEncounterName !== null) {
        let temp = {
          actors: [],
          activePosition: 0,
          numTurns: 0,
          owner: '',
          encounterName: newEncounterName
        };
        this.state.encounters.push(temp);
        this.changeActiveEncounter(this.state.encounters.length - 1);
      }
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="appContainer">
        <div className="signInPanelWrapper">
          <h1 className="signInPanelHeader">THE INITIATIVE PROJECT</h1>
          {!this.state.user && (
            <div id="signInPanel">
              <input
                name="email"
                type="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="email"
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="emailPassword"
              />
              <button
                className="loginPanelButton customButton"
                onClick={this.handleLogIn}
              >
                <img
                  width="14"
                  height="14"
                  src="https://s3.amazonaws.com/the-initiative-project/login.svg"
                />
                Log In
              </button>
              <button
                className="signupPanelButton customButton"
                onClick={this.handleSignUp}
              >
                Sign Up
              </button>
            </div>
          )}
          {this.state.user && (
            <div className="logoutWrapper">
              <span className="welcome-description">Welcome back!</span>
              <button
                className="logout customButton"
                onClick={this.handleLogOut}
              >
                Log Out
              </button>
            </div>
          )}
          <div
            className="appWrapper"
            style={{
              backgroundImage:
                'url(https://s3.amazonaws.com/the-initiative-project/' +
                currImg +
                ')',
              backgroundSize: 'cover'
            }}
          >
            <div className="darkWrapper" />
            <div className="mainWrapper">
              <RollInitiative
                rollInitiativeToggle={this.rollInitiativeToggle}
              />
              <Library
                currentTab={this.state.currentTab}
                srdList={this.state.srdMonsters}
                homebrewList={this.state.homebrewMonsters}
                addActorToEncounter={this.addActorToEncounter}
                switchTab={this.switchTab}
                handleInputChange={this.handleInputChange}
                firestoreAddHomebrewMonster={this.firestoreAddHomebrewMonster}
                hbAC={this.state.hbAC}
                hbChaSave={this.state.hbChaSave}
                hbConSave={this.state.hbConSave}
                hbDexSave={this.state.hbDexSave}
                hbMaxHP={this.state.hbMaxHP}
                hbInitMod={this.state.hbInitMod}
                hbIntSave={this.state.hbIntSave}
                hbName={this.state.hbName}
                hbStrSave={this.state.hbStrSave}
                hbWisSave={this.state.hbWisSave}
                user={this.state.user}
              />
              <Encounter
                encounters={this.state.encounters}
                partyMembers={this.state.partyMembers}
                addActorToEncounter={this.addActorToEncounter}
                handleInputChange={this.handleInputChange}
                healActor={this.healActor}
                damageActor={this.damageActor}
                onDragEnd={this.onDragEnd}
                activeEncounter={this.state.activeEncounter}
                createNewEncounter={this.createNewEncounter}
                switchTurn={this.switchTurn}
                sort={this.sort}
                saveEncounter={this.saveEncounter}
                deleteActorFromEncounter={this.deleteActorFromEncounter}
                editActorFromEncounter={this.editActorFromEncounter}
              />
              <PartyMembers
                currentEncounter={
                  this.state.encounters[this.state.activeEncounter].actors
                }
                partyMembers={this.state.partyMembers}
                addActorToEncounter={this.addActorToEncounter}
                onDragEnd={this.onDragEnd}
                addToPartyMembers={this.addToPartyMembers}
              />
              <SavedEncounters
                encounters={this.state.encounters}
                activeEncounter={this.state.activeEncounter}
                changeActiveEncounter={this.changeActiveEncounter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
