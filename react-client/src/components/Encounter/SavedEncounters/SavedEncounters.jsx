import React from 'react';
import './SavedEncounter.css';

class SavedEncounters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="savedEncountersWrapper">
        <div className="savedEncountersWrapperHeader">
          <h1>Saved Encounters</h1>
        </div>
        <div className="savedEncounter-list-wrapper">
          {this.props.encounters.map((elem, idx) => {
            return (
              <div
                onClick={() => this.props.changeActiveEncounter(idx)}
                key={idx}
                className={'saved-ecounter-item-wrapper ' +
                  (idx === this.props.activeEncounter ? 'selected-encounter' : '')
                }
              >
                <span className="party-member-add">
                  <img
                    width="25"
                    height="25"
                    src="https://s3.amazonaws.com/the-initiative-project/left-arrow.svg"
                  />
                </span>
                {elem.encounterName}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SavedEncounters;
