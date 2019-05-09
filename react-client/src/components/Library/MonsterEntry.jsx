import React from 'react';

const MonsterEntry = props => {
  let { entry } = props;
  return (
    <li>
      <div>
        <div>{entry.name}</div>
        <div>HP: {entry.maxHP}</div>
      </div>
      <div>
        <div>
          Cha: {entry.chaSave} Con: {entry.conSave} Dex: {entry.dexSave} Int:{' '}
          {entry.intSave} Str: {entry.strSave} Wis: {entry.wisSave}
        </div>
        <div>AC: {entry.armorClass}</div>
      </div>
    </li>
  );
};

export default MonsterEntry;
