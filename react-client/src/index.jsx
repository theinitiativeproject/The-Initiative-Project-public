import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Encounter from './components/Encounter/Encounter.jsx';
import PartyMembers from './components/PartyMembers/PartyMembers.jsx';
import Library from './components/Library.jsx';
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

var images = ['background1.jpg', 'background2.jpg', 'background3.jpg', 'background4.jpg', 'background5.jpg', 'background6.jpg', 'background7.jpg'];
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
      currentTab: 'srd',
      srdMonsters: [],
      homebrewMonsters: [],
      partyMembers: [],
      encounters: [],
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
    this.addActorToEncounter = this.addActorToEncounter.bind(this);
    this.addToPartyMembers = this.addToPartyMembers.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.firestoreAddHomebrewMonster = this.firestoreAddHomebrewMonster.bind(
      this
    );
    this.switchTab = this.switchTab.bind(this);
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
          encounters: []
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
          return [];
        }
        let resultsArr = [];
        snapshot.forEach(doc => {
          let data = doc.data();
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
    db.collection('srd_monsters')
      .where('name', '>=', '')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('no monsters in SRD database');
          return;
        }
        let resultsArr = [];
        snapshot.forEach(doc => {
          let data = doc.data();
          resultsArr.push(data);
        });
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
    //TODO: validate real email
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

  addActorToEncounter(actor) {
    console.log(actor);
    actor.currentHP = actor.maxHP;
    console.log('in add actor to encounter');
    let tempEncounters = this.state.encounters.slice();
    tempEncounters[this.state.activeEncounter].actors.push(actor);
    this.setState({
      encounters: tempEncounters
    });
  }

  addToPartyMembers(obj) {
    db.collection('party_members')
      .add(obj)
      .then(() => {
        console.log('Added to Party Members');
      })
      .catch(err =>
        console.log('error adding character to Party Members', err)
      );
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

  switchTab(newTab) {
    this.setState({
      currentTab: newTab
    });
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
          <div className="appWrapper" style={{ 'backgroundImage': 'url(https://s3.amazonaws.com/the-initiative-project/' + currImg + ')', 'backgroundSize' : 'cover' }}>
            <div className="darkWrapper"></div>
            <div className="mainWrapper">
              <Library
                currentTab={this.state.currentTab}
                srdList={this.state.srdMonsters}
                homebrewList={this.state.homebrewMonsters}
                switchTab={this.switchTab}
              />
              <Encounter 
                encounters={this.state.encounters} 
                partyMembers={this.state.partyMembers} 
                addActorToEncounter={this.addActorToEncounter} 
                onDragEnd={this.onDragEnd}
                activeEncounter={this.state.activeEncounter}
              />
              <PartyMembers 
                partyMembers={this.state.partyMembers}  
                onDragEnd={this.onDragEnd}/>
            </div>
          </div>
          {this.state.user && (
            <form
              onSubmit={e => {
                e.preventDefault();
                this.firestoreAddHomebrewMonster(
                  {
                    armorClass: parseInt(this.state.hbAC),
                    chaSave: parseInt(this.state.hbChaSave),
                    conSave: parseInt(this.state.hbConSave),
                    dexSave: parseInt(this.state.hbDexSave),
                    maxHP: parseInt(this.state.hbMaxHP),
                    initMod: parseInt(this.state.hbInitMod),
                    intSave: parseInt(this.state.hbIntSave),
                    name: this.state.hbName,
                    strSave: parseInt(this.state.hbStrSave),
                    wisSave: parseInt(this.state.hbWisSave)
                  },
                  this.state.user.uid
                );
              }}
            >
              <h3>Add homebrew monster</h3>
              <input
                type="text"
                name="hbName"
                value={this.state.hbName}
                onChange={this.handleInputChange}
                placeholder="name"
              />
              <input
                type="number"
                name="hbAC"
                value={this.state.hbAC}
                onChange={this.handleInputChange}
                placeholder="armor class"
              />
              <input
                type="number"
                name="hbChaSave"
                value={this.state.hbChaSave}
                onChange={this.handleInputChange}
                placeholder="charisma save"
              />
              <input
                type="number"
                name="hbConSave"
                value={this.state.hbConSave}
                onChange={this.handleInputChange}
                placeholder="constitution save"
              />
              <input
                type="number"
                name="hbDexSave"
                value={this.state.hbDexSave}
                onChange={this.handleInputChange}
                placeholder="dexterity save"
              />
              <input
                type="number"
                name="hbMaxHP"
                value={this.state.hbMaxHP}
                onChange={this.handleInputChange}
                placeholder="maximum HP"
              />
              <input
                type="number"
                name="hbInitMod"
                value={this.state.hbInitMod}
                onChange={this.handleInputChange}
                placeholder="initiative modifier"
              />
              <input
                type="number"
                name="hbIntSave"
                value={this.state.hbIntSave}
                onChange={this.handleInputChange}
                placeholder="intelligence save"
              />
              <input
                type="number"
                name="hbStrSave"
                value={this.state.hbStrSave}
                onChange={this.handleInputChange}
                placeholder="strength save"
              />
              <input
                type="number"
                name="hbWisSave"
                value={this.state.hbWisSave}
                onChange={this.handleInputChange}
                placeholder="wisdom save"
              />
              <button type="submit">Submit Homebrew Monster</button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
