import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';

const BaseMonsters = props => {
  let { baseList } = props;
  return (
    <ul>
      {baseList.map(entry => (
        <MonsterEntry entry={entry} />
      ))}
    </ul>
  );
};

export default BaseMonsters;
