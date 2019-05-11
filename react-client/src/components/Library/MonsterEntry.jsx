import React from 'react';
import './MonsterEntry.css';

const MonsterEntry = props => {
  let { entry, heartIcon, addActorToEncounter } = props;
  return (
    <li className="monsterBox" onClick={() => addActorToEncounter(entry)}>
      <div className="monsterRow">
        <div>
          <span className="monsterName">{entry.name}</span>
          <br />
          <span className="saves">
            <div className="saveBlock">
              Str: {entry.strSave}
              <br />
              Int: {entry.intSave}
            </div>
            <div className="saveBlock">
              Dex: {entry.dexSave}
              <br />
              Wis: {entry.wisSave}
            </div>
            <div className="saveBlock">
              Con: {entry.conSave}
              <br />
              Cha: {entry.chaSave}
            </div>
          </span>
        </div>
        <div className="HPArmor">
          <span className="HPAflex">
            <img className="HPAicon" width="25" height="25" src={heartIcon} /> :{' '}
            {entry.maxHP}
          </span>
          <span className="HPAflex">
            <img
              className="HPAicon"
              width="20"
              height="20"
              src="https://s3.amazonaws.com/the-initiative-project/dark-shield.svg"
            />
            : {entry.armorClass}
          </span>
        </div>
      </div>
    </li>
  );
};

export default MonsterEntry;
