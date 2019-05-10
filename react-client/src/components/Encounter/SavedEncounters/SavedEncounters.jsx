import React from 'react';
import List from '../../Utilities/List.jsx';
import './SavedEncounter.css';

class SavedEncounters extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
            <div className='savedEncountersWrapper'>
                <div className='savedEncountersWrapperHeader'>
                    <h1>Saved Encounters</h1>
                </div>
                <List />
            </div>
		);
	}

}

export default SavedEncounters;