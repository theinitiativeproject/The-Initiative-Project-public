import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';
import './HomebrewMonsters.css';

const HomebrewMonsters = props => {
  let { homebrewList, addActorToEncounter } = props;
  return (
    <ul className="homebrewCreatures">
      {homebrewList.map(entry => (
        <MonsterEntry entry={entry} addActorToEncounter={addActorToEncounter} />
      ))}
    </ul>
  );
};

export default HomebrewMonsters;
