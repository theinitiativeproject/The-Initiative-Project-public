import React from 'react';

class CharacterStats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div className="character-item-summary-col">
                <span>
                    Strength Save: {this.props.character.strSave || 0}
                </span>
                <span>
                    Dexterity Save: {this.props.character.dexSave || 0}
                </span>
                <span>
                    Constitution Save: {this.props.character.conSave || 0}
                </span>
                </div>
                <div className="character-item-summary-col">
                <span>
                    Intelligence Save: {this.props.character.intSave || 0}
                </span>
                <span>Wisdom Save: {this.props.character.wisSave || 0}</span>
                <span>
                    Charisma Save: {this.props.character.chaSave || 0}
                </span>
                </div>
            </div>
        );
    }
}

export default CharacterStats;