import React from 'react';
import './CharacterItem.css';
import { Draggable } from 'react-beautiful-dnd';
import HPChanger from './HPChanger/HPChanger.jsx';
import CharacterStats from './CharacterStats/CharacterStats.jsx';
import CharacterInputForm from './CharacterInputForm/CharacterInputForm.jsx';

class CharacterItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      canEdit: false
    };
    this.toggleDetails = this.toggleDetails.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleDetails() {
    this.setState({ showDetails: !this.state.showDetails }, () => {
      if(!this.state.toggleDetails) {
        this.setState({ canEdit : false });
      }
    });
    
  }

  toggleEdit() {
    this.setState({ canEdit : !this.state.canEdit }, () => {
      if(this.state.canEdit) {
        this.setState({ showDetails : true });
      }
    });
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
              <div>
                <span className="character-level">
                  {typeof this.props.character.initiative === 'number'
                    ? this.props.character.initiative
                    : '?'}
                </span>
                <span className="character-name">
                  {this.props.character.name}
                </span>
                { 
                  (this.props.currentTurn !== this.props.index) && (
                    <span className="character-show-details" onClick={this.toggleDetails}>
                      <img
                        width="20"
                        height="20"
                        src={ (this.state.showDetails ? "https://s3.amazonaws.com/the-initiative-project/up-arrow.svg" : "https://s3.amazonaws.com/the-initiative-project/down-arrow.svg")}
                      /> 
                    </span>)
                }
                <span className="character-edit" onClick={this.toggleEdit}>
                  <img width="15" height="15" src="https://s3.amazonaws.com/the-initiative-project/edit.svg" />
                </span>
              </div>
              <span className="character-description-wrapper">
                <span className="character-heal-wrapper">
                  <HPChanger />
                </span>
                {this.props.character.currentHP && (
                  <span className="character-description-hit-point">
                    <img
                      width="25"
                      height="25"
                      src="https://s3.amazonaws.com/the-initiative-project/little-health.svg"
                    />
                    :{' '}
                    <div className="healthCounter">
                      <div className="healthCounterCurrent">
                        {this.props.character.currentHP}
                      </div>
                      <div className="healthCounterMax">
                        {this.props.character.maxHP}
                      </div>
                    </div>
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
                <span
                  className="death-wrapper"
                  onClick={() =>
                    this.props.deleteActorFromEncounter(this.props.index)
                  }
                >
                  <img
                    width="25"
                    height="25"
                    src={
                      this.props.currentTurn === this.props.index
                        ? 'https://s3.amazonaws.com/the-initiative-project/skull-black.svg'
                        : 'https://s3.amazonaws.com/the-initiative-project/skull-light-grey.svg'
                    }
                  />
                </span>
              </span>
            </div>

            <div
              className="character-item-summary-wrapper"
              style={{
                display:
                  this.state.showDetails ||
                  this.props.currentTurn === this.props.index
                    ? 'block'
                    : 'none'
              }}
            >
              <div className="character-item-summary-info">
                { this.state.canEdit && <CharacterInputForm index={this.props.index} character={this.props.character} handleInputChange={this.props.handleInputChange} editActorFromEncounter={this.props.editActorFromEncounter} toggleEdit={this.toggleEdit} />}
                { !this.state.canEdit && <CharacterStats character={this.props.character} /> }
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default CharacterItem;
