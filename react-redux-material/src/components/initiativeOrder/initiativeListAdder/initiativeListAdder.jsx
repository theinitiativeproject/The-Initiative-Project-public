import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addCombatantBlock,
  addCombatantToBlock
} from '../../../actions/combatActions';

const InitiativeListAdder = props => {
  const [initiative, setInitiative] = useState('');
  const [name, setName] = useState('');
  const [ac, setAC] = useState('');
  const [hp, setHP] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    let init = typeof initiative === 'string' ? -Infinity : initiative;
    props.addCombatantBlock({ name, ac, hp }, init);
    setInitiative('');
    setName('');
    setAC('');
    setHP('');
    document.getElementById('name_field').focus();
    document.getElementById('name_field').select();
  };

  const handleAlternateSubmit = e => {
    let targetBlock = prompt('Which 0 indexed block would you like to add to?');
    props.addCombatantToBlock({ name, ac, hp }, targetBlock);
    setInitiative('');
    setName('');
    setAC('');
    setHP('');
    document.getElementById('name_field').focus();
    document.getElementById('name_field').select();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="name_field"
          type="text"
          onChange={e => setName(e.target.value)}
          name="name"
          placeholder="Name"
          value={name}
        />
        <input
          type="number"
          onChange={e => {
            let init = e.target.value === '' ? '' : parseInt(e.target.value);
            setInitiative(init);
          }}
          name="initiative"
          placeholder="Initiative"
          value={initiative}
        />
        <input
          type="number"
          onChange={e =>
            setHP(e.target.value === '' ? '' : parseInt(e.target.value))
          }
          name="hp"
          placeholder="Max HP"
          value={hp}
        />
        <input
          type="number"
          onChange={e =>
            setAC(e.target.value === '' ? '' : parseInt(e.target.value))
          }
          name="ac"
          placeholder="Armor Class"
          value={ac}
        />
        <button type="submit" name="new_block_button">
          Create new initiative block
        </button>
        <button
          type="button"
          name="existing_block_button"
          onClick={handleAlternateSubmit}
        >
          Add to existing block
        </button>
      </form>
    </div>
  );
};

export default connect(
  null,
  { addCombatantBlock, addCombatantToBlock }
)(InitiativeListAdder);
