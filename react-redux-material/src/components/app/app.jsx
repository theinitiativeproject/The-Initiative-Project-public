import React, { useEffect } from 'react';

// redux imports
import { Provider } from 'react-redux';
import store from '../../store';

// material UI
import { Typography } from '@material-ui/core';

// component imports

import InitiativeListContainer from '../combatManager/initiativeList/InitiativeListContainer.jsx';
import CombatControlsContainer from '../combatManager/CombatControls/CombatControlsContainer.jsx';
import CombatAdderContainer from '../combatManager/combatAdder/combatAdderContainer.jsx';

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

import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  'app-grid-layout-desktop': {
    display: 'grid',
    gridTemplateColumns: '4vw auto 20vw 4vw',
    gridTemplateRows: '5vh 10vh 10vh 60vh auto',
    gridColumnGap: '15px',
    gridRowGap: '15px'
  },
  'app-bar-grid-container-desktop': {
    gridColumn: '1 / -1',
    gridRow: '1',
    fontWeight: '500',
    marginTop: 'auto'
  },
  'initiative-list-grid-container-desktop': {
    gridColumn: '2/3',
    gridRow: '3/5'
  },
  'combatant-controls-grid-container-desktop': {
    gridColumn: '-3 / -2',
    gridRow: '3 / 4'
  },
  'temp-adder-grid-item': {
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
    marginTop: 'auto'
  },
  footer: { gridColumn: '1 / -1', gridRow: '-1' }
}));

function App() {
  const classes = useStyles();

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
      <div className={classes['app-grid-layout-desktop']}>
        <Typography
          variant={'h2'}
          align={'center'}
          className={classes['app-bar-grid-container-desktop']}
        >
          The Initiative Project
        </Typography>
        <div className={classes['temp-adder-grid-item']}>
          <CombatAdderContainer />
        </div>
        <div className={classes['initiative-list-grid-container-desktop']}>
          <InitiativeListContainer />
        </div>
        <div className={classes['combatant-controls-grid-container-desktop']}>
          <CombatControlsContainer />
        </div>
        <div className={classes.footer}>footer</div>
      </div>
    </Provider>
  );
}

export default App;
