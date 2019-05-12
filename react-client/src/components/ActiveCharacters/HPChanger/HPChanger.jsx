import React from 'react';
import './HPChanger.css';

class HPChanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HPChange: 0
    };
  }

  render() {
    let setChange = value => {
      this.setState({
        HPChange: parseInt(value)
      });
    };
    return (
      <div className="HPChanger-wrapper">
        <input
          className="HPChanger-input"
          type="number"
          name="currentHP"
          onChange={event => setChange(event.target.value)}
        />
        <div className="HPChanger-button-wrapper">
          <button
            className="HPChanger-button-heal-button"
            onClick={() =>
              this.props.healActor(this.props.index, this.state.HPChange)
            }
          >
            Heal
          </button>
          <button
            className="HPChanger-button-damage-button"
            onClick={() =>
              this.props.damageActor(this.props.index, this.state.HPChange)
            }
          >
            Damage
          </button>
        </div>
      </div>
    );
  }
}

export default HPChanger;
