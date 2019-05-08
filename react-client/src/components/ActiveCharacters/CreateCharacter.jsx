import React from 'react';
import './CreateCharacter.css';

class CreateCharacter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
			return(
				<div className="create-character-form-wrapper">
					<form className="create-character-form">
						<input className="character-level-input" type="number" size="4" placeholder="Level"/>
						<input className="character-name-input" type="text" size="20" placeholder="Name"/>
						<span className="character-description-form-wrapper">
							<input className="character-description-hit-point-input" type="number" size="4" placeholder="HP" />
							<input className="character-description-perception-input" type="number" size="4" placeholder="Perception"/>
							<input className="character-description-armour-input" type="number" size="4" placeholder="Armour"/>
						</span>
						<button className="create-character-button"><img width="25" height="25" src="https://s3.amazonaws.com/the-initiative-project/iconfinder-icon.svg" /></button>
					</form>
				</div>
			);
    }

}

export default CreateCharacter;