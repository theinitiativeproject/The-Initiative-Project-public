import React from 'react';
import SRDMonsters from './SRDMonsters.jsx';
import HomebrewMonsters from './HomebrewMonsters.jsx';
<<<<<<< HEAD
=======
import './Library.css';
>>>>>>> 95de97735e3316a67dbbbd4971305492c86550d9

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
