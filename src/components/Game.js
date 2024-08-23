import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import ColorChangingHeading from './ColorChangingHeading';
import '../App.css';

const numRows = 20;
const numCols = 20;
const interval = 500; // milliseconds

function Game() {
  const [grid, setGrid] = useState(createEmptyGrid(numRows, numCols));
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setGrid((prevGrid) => getNextGrid(prevGrid));
    }, interval);
    return () => clearInterval(timer);
  }, [running]);

  const toggleCell = (row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      if (newGrid[row][col] === 'empty') {
        newGrid[row][col] = 'tree';
      } else if (newGrid[row][col] === 'tree') {
        newGrid[row][col] = 'burning';
      } else if (newGrid[row][col] === 'burning') {
        newGrid[row][col] = 'empty';
      }
      return newGrid;
    });
  };

  const startSimulation = () => setRunning(true);
  const stopSimulation = () => setRunning(false);
  const clearGrid = () => setGrid(createEmptyGrid(numRows, numCols));

  return (
    <div className="container">
      <ColorChangingHeading text="Fire Spread Simulator" />
      <div className="button-container">
        <button className="start" onClick={startSimulation}>Start</button>
        <button className="stop" onClick={stopSimulation}>Stop</button>
        <button className="clear" onClick={clearGrid}>Clear</button>
      </div>
      <Grid grid={grid} onClickCell={toggleCell} />
    </div>
  );
  
}

// Helper functions
function createEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill('empty'));
}

function getNextGrid(grid) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const newGrid = createEmptyGrid(numRows, numCols);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const current = grid[row][col];
      const burningNeighbors = countBurningNeighbors(grid, row, col);

      if (current === 'burning') {
        newGrid[row][col] = 'empty'; // Burns out
      } else if (current === 'tree' && burningNeighbors > 0) {
        newGrid[row][col] = 'burning'; // Catches fire
      } else {
        newGrid[row][col] = current; // Remains unchanged
      }
    }
  }

  return newGrid;
}

function countBurningNeighbors(grid, row, col) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];
  const numRows = grid.length;
  const numCols = grid[0].length;
  let count = 0;

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
      count += grid[newRow][newCol] === 'burning' ? 1 : 0;
    }
  }

  return count;
}

export default Game;

