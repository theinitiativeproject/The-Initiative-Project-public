import React from 'react';
import SRDMonsters from './SRDMonsters.jsx';
import HomebrewMonsters from './HomebrewMonsters.jsx';
import HomeBrewMonsterForm from '../HomeBrewMonsterForm/HomeBrewMonsterForm.jsx';
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
      {props.user && (
        <HomeBrewMonsterForm 
          handleInputChange={props.handleInputChange} 
          firestoreAddHomebrewMonster={props.firestoreAddHomebrewMonster}
          hbAC={props.hbAC}
          hbChaSave={props.hbChaSave}
          hbConSave={props.hbConSave}
          hbDexSave={props.hbDexSave}
          hbMaxHP={props.hbMaxHP}
          hbInitMod={props.hbInitMod}
          hbIntSave={props.hbIntSave}
          hbName={props.hbName}
          hbStrSave={props.hbStrSave}
          hbWisSave={props.hbWisSave}
          user={props.user}
        />)}
    </div>
  );
};

export default Library;
