import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';
import './SRDMonsters.css';

const SRDMonsters = props => {
  let { srdList, addActorToEncounter } = props;
  let heartIcon =
    'https://s3.amazonaws.com/the-initiative-project/heart-black.svg';
  return (
    <ul className="SRDCreatures">
      {srdList.map((entry, index) => (
        <MonsterEntry
          entry={entry}
          heartIcon={heartIcon}
          addActorToEncounter={addActorToEncounter}
          key={index}
        />
      ))}
    </ul>
  );
};

export default SRDMonsters;
