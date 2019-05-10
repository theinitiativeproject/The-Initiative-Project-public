import React from 'react';
import SRDMonsters from './SRDMonsters.jsx';
import HomebrewMonsters from './HomebrewMonsters.jsx';
import './Library.css';

const Library = props => {
  let {
    currentTab,
    srdList,
    homebrewList,
    addActorToEncounter,
    switchTab
  } = props;
  return (
    <div className="superLibrary">
      <button className="SRDButton" onClick={() => switchTab('srd')}>
        SRD
      </button>
      <button className="homebrewButton" onClick={() => switchTab('homebrew')}>
        Homebrew
      </button>
      <div className="creatureList">
        {currentTab === 'srd' && (
          <SRDMonsters
            srdList={srdList}
            addActorToEncounter={addActorToEncounter}
          />
        )}
        {currentTab === 'homebrew' && (
          <HomebrewMonsters
            homebrewList={homebrewList}
            addActorToEncounter={addActorToEncounter}
          />
        )}
      </div>
    </div>
  );
};

export default Library;
