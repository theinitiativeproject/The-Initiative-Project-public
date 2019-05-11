import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';
import './HomebrewMonsters.css';

const HomebrewMonsters = props => {
  let { homebrewList, addActorToEncounter } = props;
  let heartIcon =
    'https://s3.amazonaws.com/the-initiative-project/heart-white.svg';
  return (
    <ul className="homebrewCreatures">
      {homebrewList.map((entry, index) => (
        <MonsterEntry
          entry={entry}
          heartIcon={heartIcon}
          addActorToEncounter={addActorToEncounter}
          key={index}
          type="homebrew"
        />
      ))}
    </ul>
  );
};

export default HomebrewMonsters;
