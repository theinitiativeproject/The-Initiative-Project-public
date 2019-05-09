import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';

const HomebrewMonsters = props => {
  let { homebrewList } = props;
  return (
    <ul>
      {homebrewList.map(entry => (
        <MonsterEntry entry={entry} />
      ))}
    </ul>
  );
};

export default HomebrewMonsters;
