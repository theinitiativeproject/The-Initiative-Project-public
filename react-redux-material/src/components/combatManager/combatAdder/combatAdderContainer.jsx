import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addCombatantBlock,
  addCombatantToBlock
} from '../../../actions/combatActions';

const initialState = {
  name: '',
  ac: '',
  hp: '',
  initiative: ''
};

const InitiativeListAdder = props => {
  //redux hooks
  const blockOrder = useSelector(state => state.app.combat.blockOrder);
  const dispatch = useDispatch();

  //local state for controlled inputs
  const [values, setValues] = useState(initialState);

  const handleNumericalChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value === '' ? '' : parseInt(e.target.value)
    });
  };

  const reset = () => {
    setValues(initialState);
    document.getElementById('name_field').focus();
    document.getElementById('name_field').select();
  };

  // collect fields from local state, dispatch action
  const handlePrimarySubmit = useCallback(
    e => {
      e.preventDefault();
      const { initiative, ...mob } = values;
      dispatch(
        addCombatantBlock(
          mob,
          typeof values.initiative === 'number' ? initiative : -Infinity
        )
      );
      reset();
    },
    [dispatch, values]
  );

  // collect fields from local state, dispatch action
  const handleSecondarySubmit = useCallback(
    e => {
      let targetBlockID = document.getElementById('block_selector').value;
      const { initiative, ...mob } = values;
      dispatch(addCombatantToBlock(mob, targetBlockID));
      reset();
    },
    [dispatch, values]
  );

  return (
    <div>
      <form onSubmit={handlePrimarySubmit}>
        <input
          id="name_field"
          type="text"
          onChange={e => setValues({ ...values, name: e.target.value })}
          name="name"
          placeholder="Name"
          value={values.name}
          autoFocus
          required
        />
        <input
          type="number"
          onChange={handleNumericalChange}
          name="initiative"
          placeholder="Initiative"
          value={values.initiative}
        />
        <input
          type="number"
          onChange={handleNumericalChange}
          name="hp"
          placeholder="Max HP"
          value={values.hp}
        />
        <input
          type="number"
          onChange={handleNumericalChange}
          name="ac"
          placeholder="Armor Class"
          value={values.ac}
        />
        <button type="submit" name="new_block_button">
          Create new initiative block
        </button>
        <button
          type="button"
          name="existing_block_button"
          onClick={handleSecondarySubmit}
        >
          Add to existing block
        </button>
        <select id="block_selector">
          {blockOrder.map((blockID, idx) => (
            <option value={blockID} key={idx}>
              {blockID}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default InitiativeListAdder;
