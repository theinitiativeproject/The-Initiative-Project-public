import React from 'react';
import './CharacterItem.css';

class CharacterItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
			return(
					<div className="character-item-wrapper">
							<span className="character-level">Lvl: 14</span>
							<span className="character-name">{this.props.character.name}</span>
							<span className="character-description-wrapper">
								<span className="character-description-hit-point"><img width="25" height="25" src="https://s3.amazonaws.com/the-initiative-project/favorite.svg"/>: {this.props.character.hit_point}</span>
								<span className="character-description-perception"><img width="25" height="25" src="https://s3.amazonaws.com/the-initiative-project/view.svg"/>: {this.props.character.perception}</span>
								<span className="character-description-armour"><img width="25" height="25" src="https://s3.amazonaws.com/the-initiative-project/shield.svg"/>: {this.props.character.armour}</span>
							</span>
					</div>
			);
    }

}

export default CharacterItem;