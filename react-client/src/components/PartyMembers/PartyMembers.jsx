import React from 'react';
import List from '../Utilities/List.jsx';
import './PartyMembers.css';

class PartyMembers extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
            <div className='partyMemberWrapper'>
                <div className='partyMemberWrapperHeader'>
                    <h1>Party Members</h1>
                </div>
                <List partyMembers={this.props.partyMembers} />
            </div>
		);
	}

}

export default PartyMembers;