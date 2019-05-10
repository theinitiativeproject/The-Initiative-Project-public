import React from 'react';
import './List.css';
import PartyMemberItem from '../PartyMembers/PartyMemberItem/PartyMemberItem.jsx';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CreatePartyMember from '../PartyMembers/CreatePartyMember/CreatePartyMember.jsx';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // change background colour if dragging
  background: isDragging ? '#CCCCCC' : '#F4EFE7',

  // styles we need to apply on draggables
  ...draggableStyle
});

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="party-member-list-wrapper">
        <div className="party-member-list">
          {this.props.partyMembers &&
            this.props.partyMembers.map((character, index) => (
              <PartyMemberItem
                key={index}
                character={character}
                index={index}
                getItemStyle={getItemStyle}
                addActorToEncounter={this.props.addActorToEncounter}
              />
            ))}
        </div>
        <CreatePartyMember />
      </div>
    );
  }
}

export default List;
