import React from 'react';
import SRDMonsters from './SRDMonsters.jsx';
import HomebrewMonsters from './HomebrewMonsters.jsx';
import './Library.css';

const Library = props => {
  let { currentTab, srdList, homebrewList, switchTab } = props;
  return (
    <div>
      <button onClick={() => switchTab('srd')}>SRD</button>
      <button onClick={() => switchTab('homebrew')}>Homebrew</button>
      {currentTab === 'srd' && <SRDMonsters srdList={srdList} />}
      {currentTab === 'homebrew' && (
        <HomebrewMonsters homebrewList={homebrewList} />
      )}
    </div>
  );
};

export default Library;
