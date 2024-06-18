import React from 'react';
import Square from './Square';


const Board = ({ squares, onClick }) => {

	/*const renderSquare=(i)=>{
		return <Square value={squares[i]} onClick={() => onClick(i)} />;
	}*/
	return (
		<div className='board-container'>

			<div className="board-row">
			{squares.slice(0, 3).map((square) => (
					<Square key={square.id} value={square} onClick={() => onClick(square.id)} />
				))}
			</div>
			<div className="board-row">
				{squares.slice(3, 6).map((square) => (
					<Square key={square.id} value={square} onClick={() => onClick(square.id)} />
				))}
			</div>
			<div className="board-row">
				{squares.slice(6, 9).map((square) => (
					<Square key={square.id} value={square} onClick={() => onClick(square.id)} />
				))}
			</div>
			<div className="board-row">
				{squares.slice(9, 12).map((square) => (
					<Square key={square.id} value={square} onClick={() => onClick(square.id)} />
				))}
			</div>

		</div>
	);
};

export default Board;
