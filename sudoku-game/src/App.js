import React, { useState } from 'react';

const Sudoku = () => {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill('')));

  const handleChange = (e, row, col) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
    );
    setGrid(newGrid);
  };

  const isValid = (grid, row, col, num) => {
    // Sor ellenőrzése
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num && i !== col) return false;
    }

    // Oszlop ellenőrzése
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num && i !== row) return false;
    }

    // 3x3-as cella ellenőrzése
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (grid[i][j] === num && i !== row && j !== col) return false;
      }
    }

    return true;
  };

  const isGridValid = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = grid[row][col];
        if (num !== '' && !isValid(grid, row, col, num)) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div>
      <h1>Sudoku</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 50px)', gap: '2px' }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="9"
              value={cell === '' ? '' : cell}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
              style={{
                width: '50px',
                height: '50px',
                textAlign: 'center',
                border: '1px solid #000',
                backgroundColor: !isValid(grid, rowIndex, colIndex, cell) ? '#ffcccc' : '#fff',
              }}
            />
          ))
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        {isGridValid(grid) ? (
          <p style={{ color: 'green' }}>A Sudoku érvényes!</p>
        ) : (
          <p style={{ color: 'red' }}>A Sudoku nem érvényes!</p>
        )}
      </div>
    </div>
  );
};

export default Sudoku;
