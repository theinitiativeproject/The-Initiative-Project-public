import React from 'react';
import './HPChanger.css';

class HPChanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HPChange: 0
    };

    this.setChange = this.setChange.bind(this);
  }

  setChange(value) {
    this.setState({
      HPChange: parseInt(value)
    }, () => {
      this.HP = "";
    })
  }

  render() {
    return (
      <div className="HPChanger-wrapper">
        <div className="HPChanger-button-wrapper">
          <button
            className="HPChanger-button-heal-button"
            onClick={() =>
              this.props.healActor(this.props.index, this.state.HPChange)
            }
          >
            Heal
          </button>
          <input
            className="HPChanger-input"
            type="number"
            name="currentHP"
            ref="HP"
            min="0"
            onChange={event => this.setChange(event.target.value)}
          />
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
