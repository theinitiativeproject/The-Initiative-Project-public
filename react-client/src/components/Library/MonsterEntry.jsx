import React from 'react';
import './MonsterEntry.css';

const MonsterEntry = props => {
  let { entry } = props;
  return (
    <li className="monsterBox">
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
          <span>HP: {entry.maxHP}</span>
          <span>AC: {entry.armorClass}</span>
        </div>
      </div>
    </li>
  );
};

export default MonsterEntry;
