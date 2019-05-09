import React from 'react';
import CharacterItem from './CharacterItem.jsx';
import './ActiveCharacterList.css';
import CreateCharacter from './CreateCharacter.jsx';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
	userSelect: "none",
  // change background colour if dragging
  background: isDragging ? "grey" : "#292929",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  backgroundColor: isDraggingOver ? "#292929" : "#292929",
});

class ActiveCharacterList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			characters : [
				{ level: 14, name : 'dasflakfd', 'hit_point' : 20, 'perception' : 10, 'armour' : 20, npc : true },
				{ level: 9, name : 'jlkjjkl', 'hit_point' : 10, 'perception' : 14, 'armour' : 13, npc : false },
				{ level: 22, name : 'nbsudfgh', 'hit_point' : 18, 'perception' : 17, 'armour' : 18, npc : true }
			]
		}
		this.addCharacter = this.addCharacter.bind(this);
	}

	addCharacter(obj) {
		console.log(obj);
		var characters = this.state.characters.concat(obj);
		console.log(characters);
		this.setState({ characters });
	}

	render() {
		return(
			<DragDropContext onDragEnd={this.onDragEnd}>	
				<div className="active-character-list-wrapper">
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div 
								className="encounter-character-list" 
								{...provided.droppableProps}
								ref={provided.innerRef} 	
								style={getListStyle(snapshot.isDraggingOver)}
							>
								{ this.props.encounters.map( (character, index) => <CharacterItem key={index} character={character} index={index} getItemStyle={getItemStyle} /> )}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
					<CreateCharacter addCharacter={this.addCharacter} addToEncounters={this.props.addToEncounters}/>
				</div>
			</DragDropContext>
		);
	}
}

export default ActiveCharacterList;