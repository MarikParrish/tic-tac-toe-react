import { useState, useEffect } from 'react';

import './board.scss'

const Board = () => {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xMove, setXMove] = useState(true);
    const [isWinner, setIsWinner] = useState(false);


    useEffect(() => {
        const nextMove = !xMove ? 'X' : '0';

        const isWin = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        const checkWinner = () => {

            for (let i = 0; i < isWin.length; i++) {
                const line = isWin[i];
                if (squares[line[0]] === nextMove
                    && squares[line[1]] === nextMove
                    && squares[line[2]] === nextMove) {
                    setIsWinner(true);
                }
            }
        }
        checkWinner();
    }, [squares, xMove, isWinner])



    const onHandleClick = e => {
        const data = e.target.getAttribute('data');
        const newSquares = [...squares];
        if (squares[data] === null && !isWinner) {
            xMove ? newSquares[data] = 'X' : newSquares[data] = '0';
            setSquares(newSquares);
            setXMove(!xMove);
        }
    }


    const clearBoard = () => {
        setSquares(Array(9).fill(null));
        setXMove(true);
        setIsWinner(false);
    }



    const BoardCells = () => {
        const x = [];
        for (let i = 0; i < 9; i++) {
            const y = <div onClick={(e) => onHandleClick(e)} className='board__cell' data={i} key={i}>{squares[i]}</div>
            x.push(y);
        }
        return x
    }


    return (
        <>

            <div className="board__turn">{!isWinner ? `Сейчас ходит: ${xMove ? 'X' : '0'}` : `Победитель: ${!xMove ? 'X' : '0'}`}</div>
            <div className="board">
                <BoardCells />
            </div>
            <button className="board__clear" onClick={clearBoard}>Очистить доску</button>
        </>
    )
}

export default Board;