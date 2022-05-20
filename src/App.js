import './App.css';
import React from 'react';

class Affiliation extends React.Component {
  render() {
    return (
      <li>{this.props.title}</li>
    )
  }
}

class Starwars extends React.Component {
  constructor() {
    super();

    this.state = {
      image: '',
      name: '',
      height: '',
      homeWorld: '',
      species: '',
      affiliations: [],
      charLoad: false
    }
  }
  getCharacter(){
      const random = Math.ceil(Math.random() * 88)
      const url = `https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/id/${random}.json`;
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
        name: data['name'],
        species: data['species'],
        gender: data['gender'],
        height: data['height'],
        homeWorld: data['homeworld'],
        img: data['image'],
        affiliations: data['affiliations'],
        charLoad: true
      });
    });
  }

  render() {
    const affiliation = this.state.affiliations.map((title, i) =>{
      return <Affiliation key={i} title={title} />
    });

    return (
      <div>
        {
          this.state.charLoad &&
          <div className="container">
            <div className="img-container">
              <img src={this.state.img} alt="char-img" className='char-img'/>
            </div>
            <div className='content'>
              <h1>Name: {this.state.name}</h1>
              <p>Height: {this.state.height} m</p>
              <p>Species: {this.state.species}</p>
              <p>Gender: {this.state.gender}</p>
              <p>From Planet: {this.state.homeWorld}</p>
              <ul> Affiliations:
              {affiliation}
              </ul>
            </div>
          </div>
        }
        <button
          type='button'
          className='btn'
          onClick={() => this.getCharacter()}
          >
            Randomize Character
        </button>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Starwars />
      </header>
    </div>
  );
}

export default App;
