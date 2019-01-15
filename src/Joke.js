import React, { Component } from 'react';
import styled from 'styled-components';

const StyledJoke = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: firebrickred;
`;

const StyledBtn = styled.button`
  margin: 5px;
`;

class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleVoteDn = this.handleVoteDn.bind(this);
    this.handleVoteUp = this.handleVoteUp.bind(this);
  }

  handleVoteUp(evt) {
    this.props.changeScore('add', this.props.idx);
  }

  handleVoteDn(evt) {
    this.props.changeScore('subtract', this.props.idx);
  }

  render() {
    const { score, jokeComp } = this.props;
    return (
      <StyledJoke>
        <p>Score is {score} </p>
        <StyledBtn onClick={this.handleVoteUp}>
          <i class="fas fa-thumbs-up" />
        </StyledBtn>
        <StyledBtn onClick={this.handleVoteDn}>
          <i class="fas fa-thumbs-down" />
        </StyledBtn>
        <p>{jokeComp}</p>
      </StyledJoke>
    );
  }
}

export default Joke;
