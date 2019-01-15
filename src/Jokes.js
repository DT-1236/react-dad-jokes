import React, { Component } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import Joke from './Joke.js';
import './Jokes.css';

const StyledJokes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: peachpuff;
`;
const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const StyledSpin = styled.i`
  animation: 1s ${spin} infinite linear;
`;

class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: Array.from({ length: 10 }) };
    this.getJoke = this.getJoke.bind(this);
    this.renderJokes = this.renderJokes.bind(this);
    this.changeScore = this.changeScore.bind(this);
    this.getLocalJokes = this.getLocalJokes.bind(this);
    this.getNewJokes = this.getNewJokes.bind(this);
  }

  // review this async and await
  async componentDidMount() {
    let localJokes = await this.getLocalJokes();
    if (!localJokes || !localJokes[0]) {
      this.getNewJokes();
    } else {
      this.setState({ jokes: localJokes });
    }
  }

  async componentDidUpdate() {
    localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
  }

  async getNewJokes() {
    await this.setState({ jokes: Array.from({ length: 10 }) });
    let recdJokes = await Promise.all(
      this.state.jokes.map(async s => {
        let strObj = await this.getJoke();
        strObj.data.score = 0;
        strObj.data.up = false;
        strObj.data.down = false;

        return strObj.data;
      })
    );
    // Style Optimal
    let jokesNoDup = [];
    let seen = new Set();
    for (let joke of recdJokes) {
      // console.log('joke is ', joke, 'seen is', seen);
      while (seen.has(joke.id)) {
        let newSingleJoke = await this.getJoke();
        newSingleJoke.data.score = 0;
        newSingleJoke.data.up = false;
        newSingleJoke.data.down = false;
        joke = newSingleJoke.data;
      }
      jokesNoDup.push(joke);
      seen.add(joke.id);
    }

    this.setState({ jokes: jokesNoDup });
  }

  async getLocalJokes() {
    let localJokes = localStorage.getItem('jokes');
    return JSON.parse(localJokes);
  }

  changeScore(operation, idx) {
    let newObj = [...this.state.jokes];
    if (operation === 'add') {
      newObj[idx].score++;
      newObj[idx].up = true;
      setTimeout(() => {
        newObj = [...this.state.jokes];
        newObj[idx].up = false;
        this.setState({ jokes: newObj });
      }, 1000);
    } else {
      newObj[idx].score--;
      newObj[idx].down = true;
      setTimeout(() => {
        newObj = [...this.state.jokes];
        newObj[idx].down = false;
        this.setState({ jokes: newObj });
      }, 1000);
    }
    this.setState({ jokes: newObj });
  }

  getJoke() {
    return axios.get(`https://icanhazdadjoke.com/`, {
      headers: { Accept: 'application/json' }
    });
  }

  renderJokes() {
    return this.state.jokes[0] ? (
      this.state.jokes
        .map((joke, i) =>
          joke ? (
            <StyledJokes key={joke.id}>
              <Joke
                jokeComp={joke.joke}
                score={joke.score}
                changeScore={this.changeScore}
                idx={i}
                up={joke.up}
                down={joke.down}
              />
            </StyledJokes>
          ) : null
        )
        .sort(function(a, b) {
          // console.log('sort', a.props.children.props.score);
          return b.props.children.props.score - a.props.children.props.score;
        })
    ) : (
      <StyledSpin className="fas fa-spinner" id="spinner" />
    );
  }

  render() {
    return (
      <StyledJokes>
        <button onClick={this.getNewJokes}>Get New Jokes</button>
        {this.renderJokes()}
      </StyledJokes>
    );
  }
}

export default Jokes;

{
  /* <img
  src="https://media.giphy.com/media/hwOlbhE2eUdLa/giphy.gif"
  alt="Spinner"
/>; */
}
