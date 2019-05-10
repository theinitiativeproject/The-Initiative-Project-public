import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';
import './SRDMonsters.css';

const SRDMonsters = props => {
  let { srdList, addActorToEncounter } = props;
  return (
    <ul className="SRDCreatures">
      {srdList.map((entry, idx) => (
        <MonsterEntry
          entry={entry}
          addActorToEncounter={addActorToEncounter}
          key={idx}
        />
      ))}
    </ul>
  );
};

export default SRDMonsters;
