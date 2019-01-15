import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const StyledJoke = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: firebrickred;
`;

const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const StyledBtn = styled.button`
  margin: 5px;

  &.spinning {
    animation: 1s ${spin} infinite linear;
  }
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
    const up = this.props.up ? 'spinning' : '';
    const down = this.props.down ? 'spinning' : '';
    return (
      <StyledJoke>
        <p>Score is {score} </p>
        <StyledBtn
          className={up}
          onClick={this.handleVoteUp}
          disabled={this.props.up}
        >
          <i className="fas fa-thumbs-up" />
        </StyledBtn>
        <StyledBtn
          className={down}
          onClick={this.handleVoteDn}
          disabled={this.props.down}
        >
          <i className="fas fa-thumbs-down" />
        </StyledBtn>
        <p>{jokeComp}</p>
      </StyledJoke>
    );
  }
}

export default Joke;
