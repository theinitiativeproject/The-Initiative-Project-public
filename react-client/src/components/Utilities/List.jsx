import React from 'react';
import './List.css';
import PartyMemberItem from '../PartyMembers/PartyMemberItem/PartyMemberItem.jsx';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
      userSelect: "none",
    // change background colour if dragging
    background: isDragging ? "#CCCCCC" : "#F4EFE7",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

class List extends React.Component {
	constructor(props) {
		super(props);
    }
    
	render() {
		return(	
            <DragDropContext onDragEnd={this.props.onDragEnd}>	
				<div className="party-member-list-wrapper">
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div 
								className="party-member-list" 
								{...provided.droppableProps}
								ref={provided.innerRef} 	
							>
								{ this.props.partyMembers && this.props.partyMembers.map( (character, index) => <PartyMemberItem key={index} character={character} index={index} getItemStyle={getItemStyle} /> )}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			</DragDropContext>
		);
	}
}

export default List;