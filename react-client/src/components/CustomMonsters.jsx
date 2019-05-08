import React from 'react';
import MonsterEntry from './MonsterEntry.jsx';

const CustomMonsters = props => {
  let { customList } = props;
  return (
    <ul>
      {customList.map(entry => (
        <MonsterEntry entry={entry} />
      ))}
    </ul>
  );
};

export default CustomMonsters;
