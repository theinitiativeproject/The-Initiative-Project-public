import React from 'react';
import './CreateCharacter.css';

class CreateCharacter extends React.Component {
    constructor(props) {
		super(props);
		
		this.state = {
			level : 0,
			name : '',
			hit_point : 0,
			armour : 0
		}
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmitCreateCreature = this.onSubmitCreateCreature.bind(this);
	}
	
	onInputChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		});
	}

	onSubmitCreateCreature(e) {
		e.preventDefault();
		this.props.addCharacter(this.state);
	}

    render() {
			return(
				<div className="create-character-form-wrapper">
					<form className="create-character-form" onSubmit={this.onSubmitCreateCreature}>
						<input className="character-level-input" name="level" type="number" min="0" size="4" placeholder="Level" onChange={this.onInputChange} />
						<input className="character-name-input" name="name" type="text" size="20" placeholder="Name" onChange={this.onInputChange} />
						<span className="character-description-form-wrapper">
							<input className="character-description-hit-point-input" name="hit_point" type="number" min="0" size="4" placeholder="HP" onChange={this.onInputChange} />
							<input className="character-description-perception-input" name="perception" type="number" min="0" size="4" placeholder="Perception" onChange={this.onInputChange} />
							<input className="character-description-armour-input" name="armour" type="number" min="0" size="4" placeholder="Armour" onChange={this.onInputChange} />
						</span>
						<button className="create-character-button"><img width="25" height="25" src="https://s3.amazonaws.com/the-initiative-project/iconfinder-icon.svg" /></button>
					</form>
				</div>
			);
    }

}

export default CreateCharacter;