import React, { useState } from 'react';

const Sudoku = () => {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleCellClick = (row, col) => {
    if (selectedNumber === null) return;

    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? selectedNumber : cell))
    );

    if (isValid(newGrid, row, col, selectedNumber)) {
      setGrid(newGrid);
    } else {
      alert('Érvénytelen lépés!');
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
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <div>
        <h1>Sudoku</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 50px)', gap: '2px' }}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                style={{
                  width: '50px',
                  height: '50px',
                  textAlign: 'center',
                  border: '1px solid #000',
                  backgroundColor: !isValid(grid, rowIndex, colIndex, cell) ? '#ffcccc' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {cell !== '' ? cell : ''}
              </div>
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
      <div>
        <h2>Válassz számot</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '10px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div
              key={num}
              onClick={() => setSelectedNumber(num)}
              style={{
                width: '50px',
                height: '50px',
                textAlign: 'center',
                border: '1px solid #000',
                backgroundColor: selectedNumber === num ? '#ccccff' : '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {num}
            </div>
          ))}
        </div>
        <button
          onClick={() => setSelectedNumber(null)}
          style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}
        >
          Törlés
        </button>
      </div>
    </div>
  );
};

export default Sudoku;
