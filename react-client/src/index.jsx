import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import List from './components/List.jsx';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: undefined,
      items: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(userTemp => {
      if (userTemp) {
        this.setState({ user: userTemp });
      } else {
        console.log('not logged in');
      }
    });
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

  render() {
    console.log(this.state.user);
    return (
      <div>
        {!this.state.user && (
          <div id="signInPanel">
            <input
              name="email"
              type="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleLogIn}>Log In</button>
            <button onClick={this.handleSignUp}>Sign Up</button>
          </div>
        )}
        {this.state.user && (
          <button onClick={this.handleLogOut}>Log Out</button>
        )}
        <h1>Item List</h1>
        <List items={this.state.items} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
