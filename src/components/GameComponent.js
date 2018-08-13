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
      xIsNext: true,
      timeCount: 0,
      startGame: false
    };
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        if (this.state.startGame) {
          let tim = this.state.timeCount + 1;
          this.setState({timeCount: tim});
        }
      },
      1000
    );


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
      xIsNext: !this.state.xIsNext,
      startGame: true
    });
  }

  jumpTo(step) {
    if(step===0){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        timeCount: 0,
        startGame: false
      });
    }
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  secondsToTime(secs) {
    if (secs) {
      let hours = Math.floor(secs / (60 * 60));
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let obj = {
        "h": hours < 10 ? '0' + hours : hours,
        "m": minutes < 10 ? '0' + minutes : minutes,
        "s": seconds < 10 ? '0' + seconds : seconds
      };
      return <div>{obj.h}:{obj.m}:{obj.s}</div>;
    }
    return <div>00:00:00</div>

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = checkWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = "Step №" + move;
      return (
        <div key={move}>
          <Button outline color="primary" onClick={this.jumpTo.bind(this, move)}>{desc} </Button>
        </div>
      );
    });

    let status;
    if (winner) {
      status = "winner: " + winner;
      clearInterval(this.timerID);
    } else if (this.state.stepNumber === 9 && winner === null) {
      status = "Game Draw";
      clearInterval(this.timerID);
    } else {
      status = "now player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (

      <ListGroup>
        <ListGroupItem key={1}>
          <div>
            <div className="headerGame">EASY GAME{this.secondsToTime(this.state.timeCount)} {status} </div>
            <BoardComponent
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div>
            <div> History:</div>
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
