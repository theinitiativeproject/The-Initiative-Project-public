import React from 'react';
import './CharacterInputForm.css';

class CharacterInputForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            charChaSave: this.props.character.chaSave,
            charConSave: this.props.character.conSave,
            charDexSave: this.props.character.dexSave,
            charInitMod: '',
            charIntSave: this.props.character.intSave,
            charStrSave: this.props.character.strSave,
            charWisSave: this.props.character.wisSave
        }

        this.onSubmitEdits = this.onSubmitEdits.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        e.preventDefault();
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    onSubmitEdits (e) {
        this.props.editActorFromEncounter(e, this.props.index, this.state);
        this.props.toggleEdit();
    }

    render() {
        return(
            <form onSubmit={(e) => this.onSubmitEdits(e)}>
                <div className="character-item-summary-col">
                <span>
                    Strength Save: <input className="charcter-item-input" type="number" name="charStrSave" value={this.state.charStrSave || 0} onChange={this.handleInputChange} />
                </span>
                <span>
                    Dexterity Save: <input className="charcter-item-input" type="number" name="charDexSave" value={this.state.charDexSave || 0} onChange={this.handleInputChange} /> 
                </span>
                <span>
                    Constitution Save: <input className="charcter-item-input" type="number" name="charConSave" value={this.state.charConSave || 0} onChange={this.handleInputChange} /> 
                </span>
                </div>
                <div className="character-item-summary-col">
                <span>
                    Intelligence Save: <input className="charcter-item-input" type="number" name="charIntSave" value={this.state.charIntSave || 0} onChange={this.handleInputChange} />
                </span>
                <span>Wisdom Save: <input className="charcter-item-input" type="number" name="charWisSave" value={this.state.charWisSave || 0} onChange={this.handleInputChange} /> 
                </span>
                <span>
                    Charisma Save: <input className="charcter-item-input" type="number" name="charChaSave" value={this.state.charChaSave || 0} onChange={this.handleInputChange} /> 
                </span>
                </div>
                <button className="charcter-item-input-button">Save Changes</button>
            </form>
        );
    }
}

export default CharacterInputForm;