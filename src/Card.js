import React, { Component } from 'react';
import './Card.css';
import EditableLabel from 'react-inline-editing';

class Card extends Component {
  constructor(props){
    super(props);
    this._handleFocusOutPlanet = this._handleFocusOutPlanet.bind(this);
    this._handleFocusOutBirthYear = this._handleFocusOutBirthYear.bind(this);
    this._planetClick = this._planetClick.bind(this);
    
    this.state = {
      togglePlanet: true,
      planet: ""
    }
  }

  _planetClick() {
    this.setState({ togglePlanet: false});
  }

  _handleFocusOutBirthYear(text) {
    fetch('http://localhost:3008/people/' + this.props.person.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({birth_year: text})
    })
    .then(response => response.json());
  }

  _handleFocusOutPlanet(event) {
    console.log(event.target);
    fetch('http://localhost:3008/people/' + this.props.person.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({homeworld: event.target.value})
    })
    .then(response => response.json());
    this.setState({ togglePlanet: true, planet: this.props.planets[event.target.value - 1].name});
  }
  componentDidMount() {
    this.setState({ planet: this.props.planet});
  }

  render() {
    return (
      <div className='card'>
        <div className='card-content'>
          	<div className='card-name'>{this.props.name}</div>
          	<img src={'http://localhost:3008/' + this.props.person.image} alt='profile'/>
            <p>
                <span>Birthday:</span>

            </p>
                <EditableLabel text={this.props.birthday}
                  inputWidth='200px'
                  inputHeight='25px'
                  labelFontWeight='bold'
                  inputFontWeight='bold'
                  onFocusOut={this._handleFocusOutBirthYear}
              />
            <p>
                {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
                <span>Homeworld:</span>
                {this.state.togglePlanet?
                  <span onClick={this._planetClick}>{this.state.planet}</span>: 
                  <select
                  value={this.props.person.homeworld } 
                  onChange={this._handleFocusOutPlanet}>
                  {this.props.planets.map(planet => (
                    <option key={planet.id} value={planet.id}>{planet.name}</option>
                  ), this)}
                  </select>
                }
            </p>
        </div>
    </div>

    );
  }
}

export default Card;
