import React from 'react';
import ActiveCharacterList from '../ActiveCharacters/ActiveCharacterList.jsx';
import './Encounter.css';

class Encounter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.encounters[this.props.activeEncounter]);
    return (
      <div className="encounterWrapper">
        <div className="encounterWrapperHeader">
          <span className="save-button">
            <button onClick={this.props.saveEncounter}>
              <img
                width="20"
                height="20"
                src="https://s3.amazonaws.com/the-initiative-project/save.svg"
              />
            </button>
          </span>
          <span onClick={this.props.createNewEncounter}>+</span>
          <h1>
            {this.props.encounters[this.props.activeEncounter]
              ? this.props.encounters[this.props.activeEncounter].encounterName
              : 'Main encounter'}
          </h1>
          <span className="next-button">
            <button onClick={this.props.sort}>
              <img
                width="20"
                height="20"
                src="https://s3.amazonaws.com/the-initiative-project/sort.svg"
              />
            </button>
            <button onClick={this.props.switchTurn}>
              <img
                width="20"
                height="20"
                src="https://s3.amazonaws.com/the-initiative-project/play.svg"
              />
            </button>
          </span>
        </div>
        <ActiveCharacterList
          onDragEnd={this.props.onDragEnd}
          encounter={this.props.encounters[this.props.activeEncounter]}
          partyMembers={this.props.partyMembers}
          addActorToEncounter={this.props.addActorToEncounter}
        />
      </div>
    );
  }
}

export default Encounter;
