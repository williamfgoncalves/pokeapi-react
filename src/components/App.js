import React, { Component } from 'react';
import PokeList from './PokeList';
import DetailView from './DetailView';
import Pokemon from '../Pokemon';
import Pokedex from './Pokedex';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleOnClick = this.handleOnClick.bind(this);
    this.pokemonMock = new Pokemon({
      id: "0",
      name: "Pokemon dont selected",
      types: [{
        type: {
          name: "Pokemon dont selected"
        }
      }],
      sprites: {
        front_default: "../assets/default.jpg"
      }
    });
  }
  handleOnClick(id) {
    var proxy_url = 'https://cors-anywhere.herokuapp.com/';
    fetch(`${proxy_url}https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => {
        const pokemon = new Pokemon(data);
        this.setState({ pokemon });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <Pokedex />
        <PokeList handleOnClick={this.handleOnClick} />
        <DetailView pokemon={this.state.pokemon || this.pokemonMock} />
      </div>
    );
  }
}

export default App;
