import React from 'react';
import BaseMonsters from './BaseMonsters.jsx';
import CustomMonsters from './CustomMonsters.jsx';

const Library = props => {
  let { currentTab, baseList, customList, switchTab } = props;
  let CurrentList;

  if (currentTab === 'base') CurrentList = <BaseMonsters baseList={baseList} />;
  else if (currentTab === 'custom')
    CurrentList = <CustomMonsters customList={customList} />;

  return (
    <div>
      <button onClick={() => switchTab('base')}>Base</button>
      <button onClick={() => switchTab('custom')}>Custom</button>
      {CurrentList}
    </div>
  );
};

export default Library;
