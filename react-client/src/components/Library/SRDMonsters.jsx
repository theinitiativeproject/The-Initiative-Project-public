import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';
import './SRDMonsters.css';

const SRDMonsters = props => {
  let { srdList, addActorToEncounter } = props;
  return (
    <ul className="SRDCreatures">
      {srdList.map((entry, index) => (
        <MonsterEntry
          entry={entry}
          addActorToEncounter={addActorToEncounter}
          key={index}
          type="srd"
        />
      ))}
    </ul>
  );
};

export default SRDMonsters;
