import React from 'react';
import './HPChanger.css';

class HPChanger extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="HPChanger-wrapper">
                <button className="HPChanger-button heal-button">Heal</button>
                <input type="number" name="currentHP"/>
                <button className="HPChanger-button damage-button">Damage</button>
            </div>
        );
    }

}

export default HPChanger;