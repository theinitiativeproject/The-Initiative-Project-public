import React from 'react';
import SRDMonsters from './SRDMonsters.jsx';
import HomebrewMonsters from './HomebrewMonsters.jsx';
import './Library.css';

const Library = props => {
  let { currentTab, srdList, homebrewList, switchTab } = props;
  return (
    <div className="superLibrary">
      <button className="SRDButton" onClick={() => switchTab('srd')}>
        SRD
      </button>
      <button className="homebrewButton" onClick={() => switchTab('homebrew')}>
        Homebrew
      </button>
      <div className="creatureList">
        {currentTab === 'srd' && <SRDMonsters srdList={srdList} />}
        {currentTab === 'homebrew' && (
          <HomebrewMonsters homebrewList={homebrewList} />
        )}
      </div>
    </div>
  );
};

export default Library;
