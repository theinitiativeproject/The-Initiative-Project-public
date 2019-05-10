import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';
import './SRDMonsters.css';

const SRDMonsters = props => {
  let { srdList } = props;
  return (
    <ul className="SRDCreatures">
      {srdList.map(entry => (
        <MonsterEntry entry={entry} />
      ))}
    </ul>
  );
};

export default SRDMonsters;
