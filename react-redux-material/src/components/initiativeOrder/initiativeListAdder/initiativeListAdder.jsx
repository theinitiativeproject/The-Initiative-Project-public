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

  const reset = () => {
    setInitiative('');
    setName('');
    setAC('');
    setHP('');
    document.getElementById('name_field').focus();
    document.getElementById('name_field').select();
  };
  const handleSubmit = e => {
    e.preventDefault();
    let init = typeof initiative === 'string' ? -Infinity : initiative;
    props.addCombatantBlock({ name, ac, hp }, init);
    reset();
  };

  const handleAlternateSubmit = e => {
    let targetBlock = document.getElementById('block_selector').value;
    props.addCombatantToBlock({ name, ac, hp }, targetBlock);
    reset();
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
          required
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
        <select id="block_selector">
          {props.blockOrder.map((blockID, idx) => (
            <option value={blockID} key={idx}>
              {blockID}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default connect(
  null,
  { addCombatantBlock, addCombatantToBlock }
)(InitiativeListAdder);
