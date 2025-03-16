import React, { useState } from 'react';
import './App.css'; // Importáljuk a stílusokat

const Sudoku = () => {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isValidMove, setIsValidMove] = useState(true);

  const handleCellClick = (row, col) => {
    if (selectedNumber === null) return;

    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? selectedNumber : cell))
    );

    if (isValid(newGrid, row, col, selectedNumber)) {
      setGrid(newGrid);
      setIsValidMove(true);
    } else {
      setIsValidMove(false);
    }
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

  return (
    <div className="sudoku-container">
      <div>
        <h1>Sudoku</h1>
        <div className="sudoku-grid">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`sudoku-cell ${!isValid(grid, rowIndex, colIndex, cell) ? 'invalid' : ''}`}
              >
                {cell !== '' ? cell : ''}
              </div>
            ))
          )}
        </div>
        <div className="error-message">
          {!isValidMove && <p>A lépés nem helyes!</p>}
        </div>
      </div>
      <div className="number-selector">
        <h2>Válassz számot</h2>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div
            key={num}
            onClick={() => setSelectedNumber(num)}
            className={selectedNumber === num ? 'selected' : ''}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sudoku;
