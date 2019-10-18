import React, { useState } from 'react';

const CombatAdderPresentation = props => {
  const [values, setValues] = useState({
    name: '',
    ac: '',
    hp: '',
    initiative: ''
  });

  const handleNumericalChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value === '' ? '' : parseInt(e.target.value)
    });
  };

  const reset = () => {
    setValues({
      name: '',
      ac: '',
      hp: '',
      initiative: ''
    });
    document.getElementById('name_field').focus();
    document.getElementById('name_field').select();
  };

  const handlePrimarySubmit = e => {
    e.preventDefault();
    props.addAsNewBlock(values);
    reset();
  };
  const handleSecondarySubmit = e => {
    let target = document.getElementById('block_selector').value;
    props.addToExistingBlock(values, target);
    reset();
  };

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

export default CombatAdderPresentation;
