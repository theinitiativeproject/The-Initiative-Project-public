import React from 'react';
import './CharacterItem.css';
import { Draggable } from 'react-beautiful-dnd';

class CharacterItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false
    };

    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails() {
    this.setState({ showDetails: !this.state.showDetails });
  }

  render() {
    return (
      <Draggable
        draggableId={this.props.character.name}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <div
            className={
              'character-item-wrapper ' +
              (this.props.character.npc ? 'character-npc ' : '') +
              (this.props.currentTurn === this.props.index ? 'currentTurn' : '')
            }
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="character-item-summary">
              <span className="character-level">
                {typeof this.props.character.initiative === 'number'
                  ? this.props.character.initiative
                  : '?'}
              </span>
              <span className="character-name">
                {this.props.character.name}
              </span>
              <span className="character-show-details" onClick={this.toggleDetails}>
                <img
                  width="20"
                  height="20"
                  src={ ((this.state.showDetails || this.props.currentTurn) === this.props.index ? "https://s3.amazonaws.com/the-initiative-project/up-arrow.svg" : "https://s3.amazonaws.com/the-initiative-project/down-arrow.svg")}
                />
              </span>
              <span className="character-description-wrapper">
                {this.props.character.currentHP && (
                  <span className="character-description-hit-point">
                    <img
                      width="25"
                      height="25"
                      src="https://s3.amazonaws.com/the-initiative-project/little-health.svg"
                    />
                    : {this.props.character.currentHP} /{' '}
                    {this.props.character.maxHP}
                  </span>
                )}
                {this.props.character.armorClass && (
                  <span className="character-description-armour">
                    <img
                      width="25"
                      height="25"
                      src="https://s3.amazonaws.com/the-initiative-project/dark-shield.svg"
                    />
                    : {this.props.character.armorClass}
                  </span>
                )}
              </span>
            </div>

            <div
              className="character-item-summary-wrapper"
              style={{ display: ( this.state.showDetails || this.props.currentTurn === this.props.index ) ? 'block' : 'none' }}
            >
              <div className="character-item-summary-info">
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
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default CharacterItem;
