import React from 'react';
import CharacterItem from './CharacterItem.jsx';
import './ActiveCharacterList.css';
import CreateCharacter from './CreateCharacter.jsx';

class ActiveCharacterList extends React.Component {
	constructor(props) {
			super(props);

			this.state = {
				characters : [
					{ name : 'dasflakfd', 'hit_point' : 20, 'perception' : 10, 'armour' : 20 },
					{ name : 'jlkjjkl', 'hit_point' : 10, 'perception' : 14, 'armour' : 13 },
					{ name : 'nbsudfgh', 'hit_point' : 18, 'perception' : 17, 'armour' : 18 }
				]
			}
	}

	render() {
			return(
					<div className="active-character-list-wrapper">
						<ul>	
							{
								this.state.characters.map( (character) => {
									return <CharacterItem character={character} />
								})
							}
							<CreateCharacter />
						</ul>
					</div>
			);
	}

}

export default ActiveCharacterList;