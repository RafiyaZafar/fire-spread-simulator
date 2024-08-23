import React from 'react';
import Cell from './Cell';

function Grid({ grid, onClickCell }) {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              status={cell}
              onClick={() => onClickCell(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
