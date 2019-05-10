import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';
import './SRDMonsters.css';

const SRDMonsters = props => {
  let { srdList, addActorToEncounter } = props;
  return (
    <ul className="SRDCreatures">
      {srdList.map(entry => (
        <MonsterEntry entry={entry} addActorToEncounter={addActorToEncounter} />
      ))}
    </ul>
  );
};

export default SRDMonsters;
