import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Encounter from './components/Encounter/Encounter.jsx';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: undefined,
      srdMonsters: [],
      homebrewMonsters: [],
      partyMembers: [],
      encounters: [],
      currentTab: 'base',
      baseList: [
        { name: 'goblin' },
        { name: 'wolf' },
        { name: 'dragon' },
        { name: 'troll' },
        { name: 'skeleton' },
        { name: 'witch' },
        { name: 'harpy' }
      ],
      customList: [
        { name: 'custom goblin' },
        { name: 'custom wolf' },
        { name: 'custom dragon' },
        { name: 'custom troll' },
        { name: 'custom skeleton' },
        { name: 'custom witch' },
        { name: 'custom harpy' }
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.retrieveSRDMonsters = this.retrieveSRDMonsters.bind(this);
    this.retrieveHomebrewMonsters = this.retrieveHomebrewMonsters.bind(this);
    this.retrieveEncounters = this.retrieveEncounters.bind(this);
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
          console.log(doc.id, '=>', data);
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
          <h1 className="signInPanelHeader">THE INITIATIVE</h1>
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
              <button className="loginPanelButton customButton" onClick={this.handleLogIn}><img width="14" height="14" src="https://s3.amazonaws.com/the-initiative-project/login.svg"/>Log In</button>
              <button className="signupPanelButton customButton" onClick={this.handleSignUp}>Sign Up</button>
            </div>
          )}
          {this.state.user && (
            <div className="logoutWrapper">
              <button className="logout customButton" onClick={this.handleLogOut}>Log Out</button>
            </div>
          )}
          <Library
            currentTab={this.state.currentTab}
            baseList={this.state.baseList}
            customList={this.state.customList}
            switchTab={this.switchTab}
          />
          <div className="appWrapper" style={{ 'backgroundImage': 'url(https://s3.amazonaws.com/the-initiative-project/' + images[Math.floor(Math.random() * images.length)] + ')', 'backgroundSize' : 'cover' }}>
            <div className="darkWrapper"></div>
            <div className="mainWrapper">
              <Encounter />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
