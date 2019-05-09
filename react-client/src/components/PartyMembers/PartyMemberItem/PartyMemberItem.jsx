import React from 'react';
import './PartyMemberItem.css';
import {Draggable} from 'react-beautiful-dnd';

class PartyMemberItem extends React.Component {
	constructor(props) {
			super(props);
	}

  render() {
		return(
			<Draggable 
			draggableId={this.props.character.name} 
			index={this.props.index}
			>
				{ (provided, snapshot) => (
					<div className={ "party-member-item-wrapper " + (this.props.character.npc ? "character-npc" : "")}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={this.props.getItemStyle(
						snapshot.isDragging,
						provided.draggableProps.style
					)}
					>
						<span className="party-member-level">Lvl: {this.props.character.level}</span>
						<span className="party-member-name">{this.props.character.name}</span>
						<span className="party-member-description-wrapper">
							{ this.props.character.currentHP && <span className="party-member-description-hit-point"><img width="25" height="25" src="https://s3.amazonaws.com/the-initiative-project/favorite.svg"/>: {this.props.character.currentHP} / {this.props.character.maxHP}</span>}
							{ this.props.character.perception && <span className="party-member-description-perception"><img width="25" height="25" src="https://s3.amazonaws.com/the-initiative-project/view.svg"/>: {this.props.character.perception}</span>}
							{ this.props.character.armorClass && <span className="party-member-description-armour"><img width="25" height="25" src="https://s3.amazonaws.com/the-initiative-project/shield.svg"/>: {this.props.character.armorClass}</span>}
						</span>
				</div>
			)}
			</Draggable>
		);
  }

}

export default PartyMemberItem;