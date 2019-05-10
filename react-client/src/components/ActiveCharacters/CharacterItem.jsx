import React from 'react';
import './CharacterItem.css';
import { Draggable } from 'react-beautiful-dnd';

class CharacterItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.currentTurn);
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
            <span className="character-level">
              {this.props.character.initiative || '?'}
            </span>
            <span className="character-name">{this.props.character.name}</span>
            <span className="character-description-wrapper">
              {this.props.character.currentHP && (
                <span className="character-description-hit-point">
                  <img
                    width="25"
                    height="25"
                    src="https://s3.amazonaws.com/the-initiative-project/favorite.svg"
                  />
                  : {this.props.character.currentHP} /{' '}
                  {this.props.character.maxHP}
                </span>
              )}
              {this.props.character.perception && (
                <span className="character-description-perception">
                  <img
                    width="25"
                    height="25"
                    src="https://s3.amazonaws.com/the-initiative-project/view.svg"
                  />
                  : {this.props.character.perception}
                </span>
              )}
              {this.props.character.armorClass && (
                <span className="character-description-armour">
                  <img
                    width="25"
                    height="25"
                    src="https://s3.amazonaws.com/the-initiative-project/shield.svg"
                  />
                  : {this.props.character.armorClass}
                </span>
              )}
            </span>
          </div>
        )}
      </Draggable>
    );
  }
}

export default CharacterItem;
