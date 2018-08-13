import React from 'react';
import BoardComponent from "./BoardComponent";
import {checkWinner} from './checkWinner'
import {Button, ListGroup, ListGroupItem} from 'reactstrap';
import './Game.css'

class GameComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{squares: Array(9).fill(null)}],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {squares: squares}
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = checkWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = "Step №" + move;
      return (
        <li key={move}>
          <a href="#" onClick={this.jumpTo.bind(this, move)}> {desc} </a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "winner: " + winner;
    } else if (this.state.stepNumber === 9 && winner === null) {
      status = "Game Draw";
    } else {
      status = "now play: " + (this.state.xIsNext ? "X" : "O");
    }
    return (

      <ListGroup>
        <ListGroupItem key={1} className="text-center">
          <div>
            <div> {status} </div>
            <BoardComponent
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div>
            <div> History: </div>
             {moves}
          </div>
          <div className="buttonGame">
            <Button onClick={this.jumpTo.bind(this, 0)} color="info">Start new game</Button>
          </div>
        </ListGroupItem>
      </ListGroup>


    );
  }
}

export default GameComponent;
