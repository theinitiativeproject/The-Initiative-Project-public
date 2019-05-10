import React from 'react';
import './RollInitiative.css';

const RollInitiative = () => (
    <div className="roll-initiative-wrapper">
        <p>Roll Initiative for Monsters</p>
        <form className="roll-initiative-form">
            <input type="checkbox" name="initiative" value="roll"/>
            <img width="30" height="30" src="https://s3.amazonaws.com/the-initiative-project/dice-twenty-faces-twenty-red.svg"/>
        </form>
    </div>
);

export default RollInitiative;