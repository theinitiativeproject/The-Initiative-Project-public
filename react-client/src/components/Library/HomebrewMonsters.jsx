import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';
import './HomebrewMonsters.css';

const HomebrewMonsters = props => {
  let { homebrewList } = props;
  return (
    <ul className="homebrewCreatures">
      {homebrewList.map(entry => (
        <MonsterEntry entry={entry} />
      ))}
    </ul>
  );
};

export default HomebrewMonsters;
