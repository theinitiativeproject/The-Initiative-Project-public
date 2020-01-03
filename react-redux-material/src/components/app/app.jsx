import React, { useEffect } from 'react';

// redux imports
import { Provider } from 'react-redux';
import store from '../../store';

// component imports
import CombatManagerContainer from '../combatManager/CombatManager.jsx';

//firebase
import * as firebase from 'firebase/app';
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

var db = firebase.firestore();

function App() {
  useEffect(() => {
    let srd;
    db.collection('srd_monsters_bulk')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // window.localStorage.setItem('srd', doc.data());
          srd = doc.data().monsters;
          window.localStorage.setItem('srd', JSON.stringify(srd));
        });
      })
      .catch(err => console.log('failed to fetch'));
    return () => {
      //cleanup;
    };
  }, []);
  return (
    <Provider store={store}>
      <CombatManagerContainer />
    </Provider>
  );
}

export default App;
