import React from 'react';
import './RollInitiative.css';

class RollInitiative extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="roll-initiative-wrapper">
        <p>Roll Initiative for Monsters</p>
        <form className="roll-initiative-form">
          <input
            type="checkbox"
            name="initiative"
            onChange={() => this.props.rollInitiativeToggle()}
            checked
          />
          <img
            width="30"
            height="30"
            src="https://s3.amazonaws.com/the-initiative-project/dice-twenty-faces-twenty-red.svg"
          />
        </form>
      </div>
    );
  }
}

export default RollInitiative;
