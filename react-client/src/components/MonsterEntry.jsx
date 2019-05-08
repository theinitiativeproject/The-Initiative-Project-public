import React from 'react';

const MonsterEntry = props => {
  let { entry } = props;
  return <li>{entry.name}</li>;
};

export default MonsterEntry;
