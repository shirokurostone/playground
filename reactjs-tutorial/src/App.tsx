import React from 'react';

type SquareValue = 'X' | 'O' | null;

type SquareProps = {
    highlight: boolean,
    onClick: { (): void },
    value: SquareValue,
}

export function Square(props: SquareProps) {
    return (
        <button
            className={props.highlight ? "square highlight" : "square"}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

type BoardProps = {
    squares: SquareValue[],
    onClick: { (i: number): void },
    highlight: number[],
}

type BoardState = {
}

export class Board extends React.Component<BoardProps, BoardState> {
    renderSquare(i: number) {
        return <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            highlight={this.props.highlight.includes(i)}
        />;
    }

    render() {
        return (
            <div>
                {
                    Array(3).fill(0).map((_, i) => {
                        return (
                            <div className="board-row" key={i}>
                                { Array(3).fill(0).map((_, j) => this.renderSquare(i * 3 + j))}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

type GameProps = {
}

type History = {
    squares: SquareValue[],
    col: number | null,
    row: number | null,
}

type GameState = {
    history: History[],
    stepNumber: number,
    xIsNext: boolean,
    orderIsAsc: boolean,
}

export class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                col: null,
                row: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            orderIsAsc: true,
        };
    }

    handleClick(i: number): void {
        const history: History[] = this.state.history.slice(0, this.state.stepNumber + 1);
        const current: History = history[history.length - 1];
        const squares: SquareValue[] = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                col: i % 3,
                row: Math.floor(i / 3),
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step: number): void {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history: History[] = this.state.history;
        const current: History = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move} (${step.col},${step.row})` : 'Go to game start';
            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move)}
                        className={move === this.state.stepNumber ? "bold" : ""}
                    >{desc}</button>
                </li>
            )
        });
        if (!this.state.orderIsAsc) {
            moves.reverse();
        }

        let status: string;
        if (winner) {
            status = 'Winner: ' + winner.mark;
        } else if (this.state.stepNumber === 9) {
            status = 'Draw';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i: number) => this.handleClick(i)}
                        highlight={winner ? winner.line : []}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div><button onClick={() => this.flipOrder()}>{this.state.orderIsAsc ? "▲" : "▼"}</button></div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    flipOrder(): void {
        this.setState({
            orderIsAsc: !this.state.orderIsAsc
        });
    }
}

function calculateWinner(squares: SquareValue[]): null | { mark: SquareValue, line: number[] } {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                mark: squares[a],
                line: lines[i],
            };
        }
    }
    return null;
}