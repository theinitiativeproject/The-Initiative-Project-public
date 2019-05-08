import React from 'react';
import ActiveCharacterList from '../ActiveCharacters/ActiveCharacterList.jsx';
import './Encounter.css';

class Encounter extends React.Component {
	constructor(props) {
			super(props);
	}

	render() {
		return(
				<div className='encounterWrapper'>
					<div className='encounterWrapperHeader'>
						<h1>Main Encounter</h1>
					</div>
					<ActiveCharacterList />
				</div>
		);
	}

}

export default Encounter;