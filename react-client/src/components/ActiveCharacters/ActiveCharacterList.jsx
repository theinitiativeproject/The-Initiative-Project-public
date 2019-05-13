import React from 'react';
import CharacterItem from './CharacterItem.jsx';
import './ActiveCharacterList.css';
import CreateCharacter from './CreateCharacter.jsx';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: 'none',
//   // change background colour if dragging
//   background: isDragging ? 'grey' : '#292929',

//   // styles we need to apply on draggables
//   ...draggableStyle
// });

// const getListStyle = isDraggingOver => ({
//   backgroundColor: isDraggingOver ? '#292929' : '#292929'
// });

class ActiveCharacterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        <div className="active-character-list-wrapper">
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="encounter-character-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.props.encounter &&
                  this.props.encounter.actors.map((character, index) => (
                    <CharacterItem
                      currentTurn={this.props.encounter.activePosition}
                      key={index}
                      character={character}
                      index={index}
                      handleInputChange={this.props.handleInputChange}
                      editActorFromEncounter={this.props.editActorFromEncounter}
                      deleteActorFromEncounter={
                        this.props.deleteActorFromEncounter
                      }
                      healActor={this.props.healActor}
                      damageActor={this.props.damageActor}
                    />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CreateCharacter
            addActorToEncounter={this.props.addActorToEncounter}
          />
        </div>
      </DragDropContext>
    );
  }
}

export default ActiveCharacterList;
