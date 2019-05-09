import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';

const SRDMonsters = props => {
  let { srdList } = props;
  return (
    <ul>
      {srdList.map(entry => (
        <MonsterEntry entry={entry} />
      ))}
    </ul>
  );
};

export default SRDMonsters;
