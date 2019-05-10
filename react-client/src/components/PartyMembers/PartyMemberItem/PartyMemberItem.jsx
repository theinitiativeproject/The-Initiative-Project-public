import React from 'react';
import './PartyMemberItem.css';
import {Draggable} from 'react-beautiful-dnd';

class PartyMemberItem extends React.Component {
	constructor(props) {
			super(props);
	}

  render() {
		return(
			<div className={ "party-member-item-wrapper " + (this.props.character.npc ? "character-npc" : "")}>
				<span className="party-member-add"><img width="25" height="25" src="https://s3.amazonaws.com/the-initiative-project/left-arrow.svg"/></span>
				<span className="party-member-name">{this.props.character.name}</span>
				<span className="party-member-description-wrapper">
					{ this.props.character.currentHP && <span className="party-member-description-hit-point"><img width="20" height="20" src="https://s3.amazonaws.com/the-initiative-project/little-health.svg"/>: {this.props.character.currentHP} / {this.props.character.maxHP}</span>}
					{ this.props.character.armorClass && <span className="party-member-description-armour"><img width="20" height="20" src="https://s3.amazonaws.com/the-initiative-project/dark-shield.svg"/>: {this.props.character.armorClass}</span>}
				</span>
			</div>
		);
  }

}

export default PartyMemberItem;