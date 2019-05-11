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
        <div>
          {this.props.encounters.map((elem, idx) => {
            return (
              <div
                onClick={() => this.props.changeActiveEncounter(idx)}
                key={idx}
                className={
                  idx === this.props.activeEncounter ? 'selected-encounter' : ''
                }
              >
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
