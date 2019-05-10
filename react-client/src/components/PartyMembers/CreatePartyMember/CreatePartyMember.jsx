import React from 'react';
import './CreatePartyMember.css';

class CreatePartyMember extends React.Component {
    constructor(props) {
		super(props);
		
		this.state = {
			name : '',
			maxHP : 0,
			armorClass : 0
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
		this.props.addToEncounter(this.state);
		//this.props.addCharacter(this.state);
	}

    render() {
			return(
				<div className="create-party-member-form-wrapper">
					<form className="create-party-member-form" onSubmit={this.onSubmitCreateCreature}>
						<input className="party-member-name-input" name="name" type="text" size="20" placeholder="Name" onChange={this.onInputChange} />
						<span className="party-member-description-form-wrapper">
							<input className="party-member-description-hit-point-input" name="maxHP" type="number" min="0" size="4" placeholder="HP" onChange={this.onInputChange} />
							<input className="party-member-description-armour-input" name="armorClass" type="number" min="0" size="4" placeholder="Armour" onChange={this.onInputChange} />
						</span>
						<button className="create-party-member-button"><img width="25" height="25" src="https://s3.amazonaws.com/the-initiative-project/party-member-add.svg" /></button>
					</form>
				</div>
			);
    }

}

export default CreatePartyMember;