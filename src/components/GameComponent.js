import React from 'react';
import BoardComponent from "./BoardComponent";
import {checkWinner} from './checkWinner'


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
      const desc = move ? "Step №" + move : "Start game";
      return (
        <li key={move}>
          <a href="#" onClick={this.jumpTo.bind(this,move)}> {desc} </a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "winner: " + winner;
    } else if (this.state.stepNumber === 9 && winner === null) {
      status = "GameComponent Draw";
    } else {
      status = "now play: " + (this.state.xIsNext ? "X" : "O");
    }
    return (

      <div className="game">
        <div className="game-board">
          <BoardComponent
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div> {status} </div>
          <ol> {moves} </ol>
        </div>
      </div>

    );
  }
}
export default GameComponent;
