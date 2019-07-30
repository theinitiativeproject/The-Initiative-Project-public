import React from 'react';
import './HomeBrewMonsterForm.css';

class HomeBrewMonsterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homebrew-monster-form-wrapper">
        <form
          className="homebrew-monster-form"
          onSubmit={e => {
            e.preventDefault();
            // kinda weird
            this.props.firestoreAddHomebrewMonster(
              {
                armorClass: parseInt(this.props.hbAC),
                chaSave: parseInt(this.props.hbChaSave),
                conSave: parseInt(this.props.hbConSave),
                dexSave: parseInt(this.props.hbDexSave),
                maxHP: parseInt(this.props.hbMaxHP),
                initMod: parseInt(this.props.hbInitMod),
                intSave: parseInt(this.props.hbIntSave),
                name: this.props.hbName,
                strSave: parseInt(this.props.hbStrSave),
                wisSave: parseInt(this.props.hbWisSave)
              },
              this.props.user.uid
            );
          }}
        >
          <input
            className="homebrew-monster-input name"
            type="text"
            name="hbName"
            value={this.props.hbName}
            onChange={this.props.handleInputChange}
            placeholder="Name"
          />
          <input
            className="homebrew-monster-input number"
            type="number"
            name="hbAC"
            value={this.props.hbAC}
            onChange={this.props.handleInputChange}
            placeholder="Armor Class"
          />
          <input
            className="homebrew-monster-input number"
            type="number"
            name="hbChaSave"
            value={this.props.hbChaSave}
            onChange={this.props.handleInputChange}
            placeholder="Charisma Save"
          />
          <input
            className="homebrew-monster-input number"
            type="number"
            name="hbConSave"
            value={this.props.hbConSave}
            onChange={this.props.handleInputChange}
            placeholder="Constitution Save"
          />
          <input
            className="homebrew-monster-input number"
            type="number"
            name="hbDexSave"
            value={this.props.hbDexSave}
            onChange={this.props.handleInputChange}
            placeholder="Dexterity Save"
          />
          <input
            className="homebrew-monster-input number"
            type="number"
            name="hbMaxHP"
            value={this.props.hbMaxHP}
            onChange={this.props.handleInputChange}
            placeholder="Maximum HP"
          />
          <input
            className="homebrew-monster-input number"
            type="number"
            name="hbInitMod"
            value={this.props.hbInitMod}
            onChange={this.props.handleInputChange}
            placeholder="Initiative Modifier"
          />
          <input
            className="homebrew-monster-input number"
            type="number"
            name="hbIntSave"
            value={this.props.hbIntSave}
            onChange={this.props.handleInputChange}
            placeholder="Intelligence Save"
          />
          <input
            className="homebrew-monster-input number"
            type="number"
            name="hbStrSave"
            value={this.props.hbStrSave}
            onChange={this.props.handleInputChange}
            placeholder="Strength Save"
          />
          <input
            className="homebrew-monster-input number"
            type="number"
            name="hbWisSave"
            value={this.props.hbWisSave}
            onChange={this.props.handleInputChange}
            placeholder="Wisdom Save"
          />
          <button className="homebrew-monster-button" type="submit">
            Submit Homebrew Monster
          </button>
        </form>
      </div>
    );
  }
}

export default HomeBrewMonsterForm;
