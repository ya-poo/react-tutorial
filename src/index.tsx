import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Repeat } from "typescript-tuple";

type SquareState = 'O' | 'X' | null

type SquareProps = {
  value: SquareState
  onClick: () => void
}

const Square = (props: SquareProps) => (
  <button className="square" onClick={props.onClick}>{props.value}</button>
)

type BoardState = Repeat<SquareState, 9>

type BoardProps = {
  squares: BoardState
  onClick: (i: number) => void
}

const Board = (props: BoardProps) => {
  const renderSquare = (i: number) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)}/>;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

type Step = {
  squares: BoardState
  xIsNext: boolean
}

type GameState = {
  readonly history: Step[]
  readonly stepNumber: number
}

const Game = () => {
  const [state, setState] = useState<GameState>({
    history: [
      {
        squares: [null, null, null, null, null, null, null, null, null],
        xIsNext: true,
      },
    ],
    stepNumber: 0,
  })

  const current = state.history[state.stepNumber]

  const handleClick = (i: number) => {
    const squares = current.squares.slice() as BoardState
    squares[i] = current.xIsNext ? 'X' : 'O'

    const next: Step = {
      squares: squares,
      xIsNext: !current.xIsNext,
    }

    setState(({ history, stepNumber }) => {
      const newHistory = history.slice(0, stepNumber + 1).concat(next)

      return {
        history: newHistory,
        stepNumber: stepNumber + 1,
      }
    })
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick}/>
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}
// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root'),
);
