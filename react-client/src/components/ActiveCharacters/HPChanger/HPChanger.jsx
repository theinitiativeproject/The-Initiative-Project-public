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
                <input className="HPChanger-input" type="number" name="currentHP" min="0"/>
                <button className="HPChanger-button damage-button">Damage</button>
            </div>
        );
    }

}

export default HPChanger;