import React from 'react';
import './CreateCharacter.css';

class CreateCharacter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initiative: '',
      name: '',
      maxHP: '',
      armorClass: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitCreateCreature = this.onSubmitCreateCreature.bind(this);
  }

  onInputChange(e) {
    if (e.target.name === 'name') {
      this.setState({
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        [e.target.name]: parseInt(e.target.value)
      });
    }
  }

  onSubmitCreateCreature(e) {
    e.preventDefault();
    if (this.state.name !== '') {
      this.props.addActorToEncounter(this.state);
      this.setState({
        initiative: '',
        name: '',
        maxHP: '',
        armorClass: ''
      });
    }
  }

  render() {
    return (
      <div className="create-character-form-wrapper">
        <form
          className="create-character-form"
          onSubmit={this.onSubmitCreateCreature}
        >
          <input
            className="character-initiative-input"
            value={this.state.initiative}
            name="initiative"
            type="number"
            min="0"
            size="4"
            placeholder="Initiative"
            onChange={this.onInputChange}
          />
          <input
            className="character-name-input"
            value={this.state.name}
            name="name"
            type="text"
            size="20"
            placeholder="Name"
            onChange={this.onInputChange}
          />
          <span className="character-description-form-wrapper">
            <input
              className="character-description-hit-point-input"
              value={this.state.maxHP}
              name="maxHP"
              type="number"
              min="0"
              size="4"
              placeholder="HP"
              onChange={this.onInputChange}
            />
            <input
              className="character-description-armour-input"
              value={this.state.armorClass}
              name="armorClass"
              type="number"
              min="0"
              size="4"
              placeholder="Armour"
              onChange={this.onInputChange}
            />
          </span>
          <button className="create-character-button" type="submit">
            <img
              width="25"
              height="25"
              src="https://s3.amazonaws.com/the-initiative-project/iconfinder-icon.svg"
            />
          </button>
        </form>
      </div>
    );
  }
}

export default CreateCharacter;
